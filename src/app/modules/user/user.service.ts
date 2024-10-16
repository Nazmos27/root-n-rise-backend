import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { UserModel } from './user.model';
import { isUserExistsByEmail } from './user.utils';
import { USER_ROLE } from './user.constant';
import { createToken } from '../../utils/jwtToken';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';

const createUserIntoDB = async (payload: TUser) => {
  // check if the user is exist
  const user = await isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist');
  }
  payload.role = USER_ROLE.user;

  const newUser = await UserModel.create(payload);
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,

    phone: newUser.phone,
    address: newUser.address,
    plan: newUser.plan,
    planValidity: newUser.planValidity,
    profilePhoto: newUser.profilePhoto,
    coverPhoto: newUser.coverPhoto,
    status: newUser.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return { accessToken, refreshToken };
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const allUsersQuery = new QueryBuilder(UserModel.find({ isDeleted: false }), query)
    .search(['name', 'email', 'role', 'phone', 'address', 'plan'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allUsersQuery.countTotal();
  const result = await allUsersQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const updateUserInDB = async (userId: string, payload: Partial<TUser>) => {
  // Check if the user exists by ID
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update user data
  const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user',
    );
  }

  // Return updated tokens and updated user
  return updatedUser;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,

    phone: user.phone,
    address: user.address,
    plan: user.plan,
    planValidity: user.planValidity,
    profilePhoto: user.profilePhoto,
    coverPhoto: user.coverPhoto,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  createUserIntoDB,
  getAllUsers,
  updateUserInDB,
  loginUser,
};
