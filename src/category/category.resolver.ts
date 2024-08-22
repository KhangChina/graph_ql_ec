import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PaginatedCategoryResponse } from './dto/paginated-category-response';

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
    // return this.categoryService.findAll();
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
  /*
  query {
      find_category_by_id (id: 5){
        name
      }
  }
  */
  @Query(() => Category, { name: 'find_category_by_id' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.categoryService.findOne(id);
  }
  /*
query {
  search_categories(name: "home", page: 2, limit: 5) {
    items {
      id
      name
    }
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage
  }
}
*/
  @Query(() => PaginatedCategoryResponse, { name: 'search_categories' })
  async search_categories(
    @Args('name', { type: () => String, nullable: true }) name: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,) {
    return await this.categoryService.findByNameWithPagination(name, page, limit);
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
