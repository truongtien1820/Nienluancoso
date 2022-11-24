import { Router } from 'express';
import PostsController from '@controllers/posts.controller';
import { CreatePostDto, UpdatePostDto } from '@dtos/posts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class PostsRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.postsController.getPosts);
    this.router.get(`${this.path}/:id`, this.postsController.getPostById);
    this.router.post(`${this.path}`, validationMiddleware(CreatePostDto, 'body'), this.postsController.createPost);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdatePostDto, 'body', true), this.postsController.updatePost);
    this.router.delete(`${this.path}/:id`, this.postsController.deletePost);
  }
}

export default PostsRoute;
