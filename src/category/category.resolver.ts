import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PaginatedCategoryResponse } from './dto/paginated-category-response';
import { MessageResponse } from 'src/misc/message-response';


@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }

  @Mutation(() => Category)
  async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return await this.categoryService.create(createCategoryInput);
  }
  /*
  query {
    get_all_category (page: 2, limit: 5) {
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
  @Query(() => PaginatedCategoryResponse, { name: 'get_all_category' })
  async category_get_all(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return await this.categoryService.findAllWithPagination(page, limit);
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
  /*
  mutation {
    update_category(updateCategoryInput : {id:16, name:"BCO"})
    {
      id,
      name
    }
  }
  */
  @Mutation(() => Category, { name: 'update_category' })
  async updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    const data = await this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
    if (data.affected > 0) {
      return updateCategoryInput
    }
    throw new Error('Update error');

  }
  /*
  mutation {
    delete_category(updateCategoryInput : {id:16, name:"BCO"})
    {
     message
    }
  }
  */
  @Mutation(() => MessageResponse, { name: 'delete_category' })
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    const data = await this.categoryService.remove(id);
    if (data.affected > 0) {
      return {
        message: `Delete id ${id} success`
      }
    }
    throw new Error(`Action delete not found ID: ${id}`);
  }
}
