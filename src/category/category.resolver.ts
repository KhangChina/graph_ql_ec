import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }

  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return await this.categoryService.create(createCategoryInput);
  }
  /*
  query {
    findAll {
      id,
      name
    }
  }
  */
  @Query(() => [Category], { name: 'category_get_all' })
  findAll() {
    //return this.categoryService.findAll();
    return [
      {
        id: 1,
        name: "Shopper"
      },
      {
        id: 2,
        name: "Shoot"
      },
    ]
  }
  /*
  query {
    migration_data_test {
      name
    }
  }
  */
  @Query(() => [Category], { name: 'migration_data_test' })
  async migration_data_test() {
    return await this.categoryService.migration_data_test();
  }

  @Query(() => Category, { name: 'category' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
