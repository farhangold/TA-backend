import { registerEnumType } from '@nestjs/graphql';

export enum BatchFormat {
  CSV = 'CSV',
  JSON = 'JSON',
}

registerEnumType(BatchFormat, {
  name: 'BatchFormat',
  description: 'Format for batch upload',
});
