import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type BlogPostDocument = HydratedDocument<BlogPost>;

export enum BlogPostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum BlogPostCategory {
  TECHNOLOGY = 'technology',
  FASHION = "fashion",
  FOOD = "food",
  TRAVEL = "travel",
  SPORT = "sport",
  ENTERTAINMENT = "entertainment",
  POLITICS = "politics",
  SCHOOL = "school",
  FINANCE = "finance",
  OTHERS = "others",
}

@Schema({
  timestamps: true,
  collection: 'blog',
  toJSON: {
    virtuals: true,
    transform: function (doc:any, ret:any) {
      delete ret.__v;
      return ret;
    },
  },
})

export class BlogPost {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({
    type: String,
    enum: BlogPostCategory,
  })
  category: BlogPostCategory;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: String,
    enum: BlogPostStatus,
    default: BlogPostStatus.DRAFT,
  })
  status: BlogPostStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: Date})
  publishedAt: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

// Indexes for better query performance
BlogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });
BlogPostSchema.index({ author: 1, status: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
