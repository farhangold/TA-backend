import { registerEnumType } from '@nestjs/graphql';

export enum ConfigType {
  RULE_UPDATE = 'RULE_UPDATE',
  THRESHOLD_UPDATE = 'THRESHOLD_UPDATE',
  RULE_TOGGLE = 'RULE_TOGGLE',
  RULE_RESET = 'RULE_RESET',
}

registerEnumType(ConfigType, {
  name: 'ConfigType',
  description: 'Types of configuration changes',
});
