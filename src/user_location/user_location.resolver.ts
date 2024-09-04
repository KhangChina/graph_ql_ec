import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserLocationService } from './user_location.service';
import { UserLocation } from './entities/user_location.entity';
import { CreateUserLocationInput } from './dto/create-user_location.input';
import { UpdateUserLocationInput } from './dto/update-user_location.input';

@Resolver(() => UserLocation)
export class UserLocationResolver {
  constructor(private readonly userLocationService: UserLocationService) {}

  @Mutation(() => UserLocation)
  createUserLocation(@Args('createUserLocationInput') createUserLocationInput: CreateUserLocationInput) {
    return this.userLocationService.create(createUserLocationInput);
  }

  @Query(() => [UserLocation], { name: 'userLocation' })
  findAll() {
    return this.userLocationService.findAll();
  }

  @Query(() => UserLocation, { name: 'userLocation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userLocationService.findOne(id);
  }

  // @Mutation(() => UserLocation)
  // updateUserLocation(@Args('updateUserLocationInput') updateUserLocationInput: UpdateUserLocationInput) {
  //   return this.userLocationService.update(updateUserLocationInput.id, updateUserLocationInput);
  // }

  @Mutation(() => UserLocation)
  removeUserLocation(@Args('id', { type: () => Int }) id: number) {
    return this.userLocationService.remove(id);
  }
}
