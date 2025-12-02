import { registerEnumType } from '@nestjs/graphql';

export enum AttributeType {
  TEST_IDENTITY = 'TEST_IDENTITY',
  TEST_ENVIRONMENT = 'TEST_ENVIRONMENT',
  STEPS_TO_REPRODUCE = 'STEPS_TO_REPRODUCE',
  ACTUAL_RESULT = 'ACTUAL_RESULT',
  EXPECTED_RESULT = 'EXPECTED_RESULT',
  SUPPORTING_EVIDENCE = 'SUPPORTING_EVIDENCE',
  SEVERITY_LEVEL = 'SEVERITY_LEVEL',
  INFORMATION_CONSISTENCY = 'INFORMATION_CONSISTENCY',
}

registerEnumType(AttributeType, {
  name: 'AttributeType',
  description: 'Types of attributes evaluated in UAT reports',
});
