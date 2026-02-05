import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BlogPost, BlogPostStatus } from './schema/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { BlogPostDocument } from './schema/blog-post.schema';
import { UpdateBlogPostDto } from './dto/upddate-blog-post.dto';

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

  async findAll() {
    const [data, total] = await Promise.all([
      this.blogPostModel.find().exec(),
      this.blogPostModel.countDocuments(),
    ]);

    return {
      data,
      meta: {
        total
      },
    };
  }

  async findOne(id: string) {
    const blogPost = await this.blogPostModel.findById(id).exec();

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    return blogPost;
  }

  async update(id: string, updateBlogPostDto: UpdateBlogPostDto, userId: string,): Promise<BlogPost> {
    const blogPost = await this.blogPostModel.findById(id).exec();

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    // Check ownership
    if (blogPost.author.toString() != userId) {
      throw new ForbiddenException('You can only update your own blog posts');
    }

    // Handle status change to published
    if ( updateBlogPostDto.status === BlogPostStatus.PUBLISHED && blogPost.status !== BlogPostStatus.PUBLISHED) {
      blogPost.publishedAt = new Date();
    }

    Object.assign(blogPost, updateBlogPostDto);
    return blogPost.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const blogPost = await this.blogPostModel.findById(id).exec();
    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    // Check ownership
    if (blogPost.author.toString() != userId) {
      throw new ForbiddenException('You can only delete your own blog posts');
    }

    await this.blogPostModel.deleteOne({ _id: id }).exec();
    return ;
  }

  async findAllByUser(author:string) {
    const query: any = {};
    query.author = author;

    const [data, total] = await Promise.all([
      this.blogPostModel.find(query).exec(),
      this.blogPostModel.countDocuments(query),
    ]);

    return {
      data,
      meta: {
        total
      },
    };
  }

  async findOneByUser(id: string, authorId:string) {
    const blogPost = await this.blogPostModel.findById({ _id: id, author: authorId }).exec();

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    return blogPost;
  }
}
