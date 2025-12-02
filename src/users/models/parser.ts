import { UserDocument } from './user';
import { UserView } from '../dto/views/user.view';

export function parseUserToView(doc: UserDocument): UserView {
  const user = doc.toObject() as any;
  delete user.password;
  return user as UserView;
}

export function parseUserInput(input: any): any {
  return {
    ...input,
  };
}
