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
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { Throttle } from '@nestjs/throttler';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @Roles(Role.Admin)
  @Throttle(5, 60)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  async findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.udpateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
