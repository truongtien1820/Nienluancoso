import { NextFunction, Request, Response } from 'express';
import { CreatePostDto, UpdatePostDto } from '@dtos/posts.dto';
import { Post } from '@interfaces/posts.interface';
import postService from '@services/posts.service';

class PostsController {
  public postService = new postService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = { ...req.query };
      const findAllPostsData: Post[] = await this.postService.findAllPost(params);

      res.status(200).json({ data: findAllPostsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: string = req.params.id;
      const findOnePostData: Post = await this.postService.findPostById(postId);

      res.status(200).json({ data: findOnePostData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: CreatePostDto = req.body;
      const createPostData: Post = await this.postService.createPost(postData);
      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: string = req.params.id;
      const postData: UpdatePostDto = req.body;
      const updatePostData: Post = await this.postService.updatePost(postId, postData);
      res.status(200).json({ data: updatePostData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: string = req.params.id;
      const deletePostData: Post = await this.postService.deletePost(postId);

      res.status(200).json({ data: deletePostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostsController;
