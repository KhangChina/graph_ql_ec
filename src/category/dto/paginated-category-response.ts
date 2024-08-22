import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
@ObjectType()
export class PaginatedCategoryResponse {
    @Field(() => [Category])
    items: Category[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    itemsPerPage: number;
}