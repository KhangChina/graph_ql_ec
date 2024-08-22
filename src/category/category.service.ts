import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private category: Repository<Category>) { }
  async create(createCategoryInput: CreateCategoryInput) {
    const cate = await this.category.create(createCategoryInput)
    return await this.category.save(cate)
  }
  async migration_data_test() {
    const categories = [];
    for (let index = 0; index < 1000; index++) {
      const createCategoryInput: CreateCategoryInput = {
        name: faker.commerce.department()
      }
      const item = await this.create(createCategoryInput)
      categories.push(item)
    }
    await this.category.save(categories)
    return categories
  }

  async findAllWithPagination(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await this.category.findAndCount({
      skip: skip,
      take: limit,
    })

    if (typeof totalItems !== 'number') {
      throw new Error('Total items count must be a number');
    }

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    }
  }

  async findOne(id: number) {
    return await this.category.findOne({ where: { id: id } });
  }

  async findByNameWithPagination(name: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await this.category.findAndCount({
      where: {
        name: Like(`%${name}%`)
      },
      skip: skip,
      take: limit,
    })

    if (typeof totalItems !== 'number') {
      throw new Error('Total items count must be a number');
    }
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    }
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return await this.category.update(id, updateCategoryInput)
  }

  async remove(id: number) {
    return await this.category.delete(id);
  }
}
