import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
  ProductSchema,
} from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private readonly logger = new Logger(ProductService.name);

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`Creating a new product ${createProductDto.name}`);
    const newProduct = new this.productModel({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      category: createProductDto.category,
    });
    return newProduct.save();
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    return product;
  }

  async udpateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updateProduct) {
      throw new NotFoundException('Product not found');
    }
    return updateProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Product Not Found');
    }
  }
}
