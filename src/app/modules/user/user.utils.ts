import { UserModel } from './user.model';

export const isUserExistsByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email }).select('+password');
  return user;
};
