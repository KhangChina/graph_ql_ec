import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { MessageResponse } from 'src/misc/message-response';
import { PaginatedProvinceResponse } from 'src/location/dto/paginated-province-response';
import { PaginatedLocationResponse } from './dto/paginated-location-response';
import { PaginatedDistrictResponse } from './dto/paginated-district-response';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) { }

  /*
  query {
   get_migration_province {
    message
    }
  }
  */
  @Query(() => MessageResponse, { name: 'get_migration_province' })
  async get_migration_province() {
    await this.locationService.migration_province();
    return {
      message: `Migration success`
    }
  }

  /*
  query {
   get_migration_district {
    message
    }
  }
  */
  @Query(() => MessageResponse, { name: 'get_migration_district' })
  async get_migration_district() {
    await this.locationService.migration_district();
    return {
      message: `Migration success`
    }
  }

  /*
  query {
   get_migration_location {
    message
    }
  }
  */
  @Query(() => MessageResponse, { name: 'get_migration_location' })
  async get_migration_location() {
    await this.locationService.migration_location();
    return {
      message: `Migration success`
    }
  }

  /*
   query {
   get_location_by_id (id:"00006"){
      id
      name
      district {
        id
        name
        level
        province {
          name
        }
      }
    }
  }
  */
  @Query(() => Location, { name: 'get_location_by_id' })
  async get_location_by_id(@Args('id', { type: () => String }) id: string) {
    return await this.locationService.get_location_by_id(id);
  }

  /*
      query {
     get_location_by_id_district (district_id:"754", search:"xã"){
      items
      {
        id
        name
        level
      }
    }
    }
    */
  @Query(() => PaginatedLocationResponse, { name: 'get_location_by_id_district' })
  async get_location_by_id_district(
    @Args('district_id', { type: () => String }) district_id: string,
    @Args('search', { type: () => String, nullable: true }) search: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ) {
    return await this.locationService.get_location_by_id_district(search, page, limit, district_id)
  }

  /*
   query {
   search_or_all_province {
    items
    {
      name
    }
  }
  }
  */
  @Query(() => PaginatedProvinceResponse, { name: 'search_or_all_province' })
  async search_or_all_province(
    @Args('search', { type: () => String, nullable: true }) search: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number) {
    return await this.locationService.search_or_all_province(search, page, limit)
  }

  /*
    query {
   get_location_by_id_province (district_id:"754", search:"xã"){
    items
    {
      id
      name
      level
    }
  }
  }
  */
  @Query(() => PaginatedDistrictResponse, { name: 'get_location_by_id_province' })
  async get_location_by_id_province(
    @Args('province_id', { type: () => String }) province_id: string,
    @Args('search', { type: () => String, nullable: true }) search: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ) {
    return await this.locationService.get_location_by_id_province(search, page, limit, province_id)
  }
}
