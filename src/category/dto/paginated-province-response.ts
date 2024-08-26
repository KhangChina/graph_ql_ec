import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Province } from 'src/location/entities/province.entity';
@ObjectType()
export class PaginatedProvinceResponse {
    @Field(() => [Province])
    items: Province[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    itemsPerPage: number;
}