import { registerEnumType } from '@nestjs/graphql';

export enum EvidenceType {
  SCREENSHOT = 'SCREENSHOT',
  VIDEO = 'VIDEO',
  LOG = 'LOG',
  DOCUMENT = 'DOCUMENT',
}

registerEnumType(EvidenceType, {
  name: 'EvidenceType',
  description: 'Type of supporting evidence',
});
