import { ObjectType, Field, Int } from '@nestjs/graphql';
import { District } from '../entities/district.entity';
@ObjectType()
export class PaginatedDistrictResponse {

    @Field(() => [District])
    items: District[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    itemsPerPage: number;

}