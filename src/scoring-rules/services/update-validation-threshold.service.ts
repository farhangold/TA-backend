import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { ThrowGQL, GQLThrowType } from '@app/gqlerr';
import {
  ValidationConfig,
  ValidationConfigDocument,
} from '../models/validation-config';
import { parseValidationConfigToView } from '../models/parser';
import { TrackConfigChangeService } from './track-config-change.service';
import { ConfigType } from '../enums/config-type.enum';
import { ValidationConfigView } from '../dto/views/validation-config.view';

@Injectable()
export class UpdateValidationThresholdService {
  constructor(
    @InjectModel(ValidationConfig.name)
    private validationConfigModel: Model<ValidationConfigDocument>,
    private trackConfigChangeService: TrackConfigChangeService,
  ) {}

  async update(threshold: number, userId: string): Promise<ValidationConfigView> {
    try {
      // Get current config or create new one
      let config = await this.validationConfigModel
        .findOne()
        .sort({ updatedAt: -1 });

      if (config) {
        const updatedConfig = await this.validationConfigModel
          .findOneAndUpdate(
            { _id: config._id },
            { $set: { threshold, updatedBy: userId } },
            { new: true },
          )
          .populate('updatedBy');

        if (!updatedConfig) {
          throw new ThrowGQL(
            'Failed to update validation config',
            GQLThrowType.UNPROCESSABLE,
          );
        }

        // Track the change
        await this.trackConfigChangeService.track(
          ConfigType.THRESHOLD_UPDATE,
          { threshold },
          userId,
        );

        return parseValidationConfigToView(updatedConfig);
      } else {
        let newConfig = await this.validationConfigModel.create({
          _id: new ObjectId().toString(),
          threshold,
          updatedBy: userId,
        });
        newConfig = await newConfig.populate('updatedBy');

        // Track the change
        await this.trackConfigChangeService.track(
          ConfigType.THRESHOLD_UPDATE,
          { threshold },
          userId,
        );

        return parseValidationConfigToView(newConfig);
      }
    } catch (error) {
      throw new ThrowGQL(error, GQLThrowType.UNPROCESSABLE);
    }
  }
}
