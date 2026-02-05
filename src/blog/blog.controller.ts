import {
  Controller, Post, Body, UseGuards, Get, Param, Put,
  Request, Delete, HttpCode, HttpStatus
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogPostStatus } from './schema/blog-post.schema';
import { UpdateBlogPostDto } from './dto/upddate-blog-post.dto';

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

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async findAllByUser(@Request() req) {
    const blog = await this.blogService.findAllByUser(req.user._id)
    return {
      message: 'Blog retrieved successfully',
      data:{
        blog
      }
    }
  }

  @Get("me/:id")
  @UseGuards(JwtAuthGuard)
  async findOneByUser(@Param('id') id: string, @Request() req) {
    const blogPost = await this.blogService.findOneByUser(id, req.user._id);
    return {
      message: 'Blog post retrieved successfully',
      data:{
        blogPost
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

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateBlogPostDto: UpdateBlogPostDto, @Request() req) {
    const blogPost = await this.blogService.update(id, updateBlogPostDto, req.user._id);
    return {
      message: 'Blog post updated successfully',
      data: {
        blogPost
      }
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    await this.blogService.remove(id, req.user._id);
    return {
      message: 'Blog post deleted successfully',
      data: null
    }
  }






}