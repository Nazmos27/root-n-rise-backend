import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TPost } from './post.interface';
import { UserModel } from '../user/user.model';
import { PostModel } from './post.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createPostIntoDB = async (payload: TPost) => {
  // check if the user is exist
  const user = await UserModel.findById(payload?.user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found');
  }
  const result = await PostModel.create(payload);

  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const allPostsQuery = new QueryBuilder(PostModel.find({ isDeleted: false }), query)
    .search(['post', 'category', 'contentType'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allPostsQuery.countTotal();
  const result = await allPostsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSinglePostFromDB = async (id: string) => {
  const result = await PostModel.findById(id);
  return result;
};

const updatePostInDB = async (postId: string, payload: Partial<TPost>) => {
  // Check if the post exists by ID
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Update post
  const result = await PostModel.findByIdAndUpdate(postId, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update post',
    );
  }

  // Return updated post
  return result;
};

const deleteSinglePostFromDB = async (id: string) => {
  const result = await PostModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostInDB,
  deleteSinglePostFromDB,
};
