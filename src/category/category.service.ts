import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const newCategory = new this.categoryModel({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    });
    await newCategory.save();
    return;
  }
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  async updateCategory(
    id: string,
    updates: Partial<Category>,
  ): Promise<Category> {
    const updateCategory = await this.categoryModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updateCategory) {
      throw new NotFoundException('Category not found');
    }
    return updateCategory;
  }
  async deleteCategory(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Category not found');
    }
  }
}
