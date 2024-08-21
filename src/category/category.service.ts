import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private category: Repository<Category>) { }
  async create(createCategoryInput: CreateCategoryInput) {
    const cate = await this.category.create(createCategoryInput);
    return await this.category.save(cate);
  }
  async migration_data_test() {
    for (let index = 0; index < 5; index++) {
      const createCategoryInput: CreateCategoryInput = {
        name : faker.commerce.department()
      }
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
