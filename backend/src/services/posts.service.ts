import { CreatePostDto, UpdatePostDto } from '@dtos/posts.dto';
import { HttpException } from '@exceptions/HttpException';
import { Post } from '@/interfaces/posts.interface';
import postModel from '@models/posts.model';
import { isEmpty } from '@utils/util';

class PostService {
  public posts = postModel;

  public async findAllPost(params): Promise<Post[]> {
    const posts: Post[] = await this.posts.find();
    return posts;
  }

  public async findPostById(postId: string): Promise<Post> {
    if (isEmpty(postId)) throw new HttpException(400, "You're not postId");

    const findPost: Post = await this.posts.findOne({ _id: postId });
    if (!findPost) throw new HttpException(409, "You're not post");

    return findPost;
  }

  public async createPost(postData: CreatePostDto): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, "You're not postData");

    const findPost: Post | null = await this.posts.findOne({ title: postData.title });
    if (findPost) throw new HttpException(409, `You're post ${postData.title} already exists`);

    const createPostData: Post = await this.posts.create({ ...postData });

    return createPostData;
  }

  public async updatePost(postId: string, postData: UpdatePostDto): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, "You're not postData");
    const updatePostById: Post = await this.posts.findByIdAndUpdate(postId, { ...postData });
    if (!updatePostById) throw new HttpException(409, "You're not post");

    return updatePostById;
  }

  public async deletePost(postId: string): Promise<Post> {
    const deletePostById: Post = await this.posts.findByIdAndDelete(postId);
    if (!deletePostById) throw new HttpException(409, "You're not post");

    return deletePostById;
  }
}

export default PostService;
