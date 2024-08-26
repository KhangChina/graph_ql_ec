import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import * as fs from 'fs';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { MessageResponse } from 'src/misc/message-response';

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

  @Query(() => [Province], { name: 'get_all_province' })
  get_all_province() {
    const res = []
    const province = this.locationService.get_all_province();
    for (let key_p of province) {
      let district = this.locationService.get_district_by_ID_province(key_p.id)
      let districtArray = []
      for (let key_d of district) {
        const commune = this.locationService.get_commune_by_ID_district(key_d.id)
        districtArray.push({
          ...key_d,
          commune: commune
        })
      }

      res.push({
        ...key_p,
        district: districtArray
      })
    }
    return res
  }

  // @Query(() => Location, { name: 'get_all_province' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.locationService.findOne(id);
  // }

  // @Mutation(() => Location)
  // updateLocation(@Args('updateLocationInput') updateLocationInput: UpdateLocationInput) {
  //   return this.locationService.update(updateLocationInput.id, updateLocationInput);
  // }

  // @Mutation(() => Location)
  // removeLocation(@Args('id', { type: () => Int }) id: number) {
  //   return this.locationService.remove(id);
  // }
}
