import {
  Controller, Post, Body, UseGuards, Get, Param,
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

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const blog = await this.blogService.findAll()
    return {
      message: 'Blog retrieved successfully',
      data:{
        blog
      }
    }
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const blogPost = await this.blogService.findOne(id);
    return {
      message: 'Blog post retrieved successfully',
      data:{
        blogPost
      }
    }
  }


}