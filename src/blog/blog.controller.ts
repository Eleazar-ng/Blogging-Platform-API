import {
  Controller, Post, Body, UseGuards, 
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogPostStatus } from './schema/blog-post.schema';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBlogPostDto: CreateBlogPostDto, @Request() req,) {
    const blogPost = await this.blogService.create(createBlogPostDto, req.user._id,);
    return {
      message: 'Blog post created successfully',
      data: {
        blogPost
      },
    };
  }

}