import { IsString, IsOptional, IsEnum, IsArray, MinLength, MaxLength } from 'class-validator';
import { BlogPostCategory, BlogPostStatus } from '../schema/blog-post.schema';

export class CreateBlogPostDto {
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(500)
  content: string;

  @IsEnum(BlogPostCategory)
  category: BlogPostCategory;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(BlogPostStatus)
  @IsOptional()
  status?: BlogPostStatus;
}