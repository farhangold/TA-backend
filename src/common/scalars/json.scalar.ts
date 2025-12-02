import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('JSON')
export class JSONScalar implements CustomScalar<any, any> {
  description = 'JSON custom scalar type';

  parseValue(value: any): any {
    return value;
  }

  serialize(value: any): any {
    return value;
  }

  parseLiteral(ast: ValueNode): any {
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value;
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
        return parseInt(ast.value, 10);
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        return this.parseObject(ast);
      case Kind.LIST:
        return ast.values.map((v) => this.parseLiteral(v));
      default:
        return null;
    }
  }

  private parseObject(ast: any): any {
    const value = Object.create(null);
    ast.fields.forEach((field) => {
      value[field.name.value] = this.parseLiteral(field.value);
    });
    return value;
  }
}
