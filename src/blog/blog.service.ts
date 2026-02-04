import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BlogPost, BlogPostStatus } from './schema/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPostDocument } from './schema/blog-post.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto, authorId: string): Promise<BlogPost> {
    const blogPost = new this.blogPostModel({
      ...createBlogPostDto,
      author: authorId,
    });

    if (blogPost.status === BlogPostStatus.PUBLISHED) {
      blogPost.publishedAt = new Date();
    }

    return blogPost.save();
  }
}