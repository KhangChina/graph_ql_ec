import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Location } from 'src/location/entities/location.entity'
@ObjectType()
export class PaginatedLocationResponse {
    
    @Field(() => [Location])
    items: Location[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    itemsPerPage: number;

}