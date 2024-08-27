import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { Throttle } from '@nestjs/throttler';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @Roles(Role.Admin)
  @Throttle(5, 60)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async updateCategory(
    @Param('id') id: string,
    @Body() updates: Partial<Category>,
  ) {
    return this.categoryService.updateCategory(id, updates);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
