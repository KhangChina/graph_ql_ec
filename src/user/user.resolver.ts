import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LocationService } from 'src/location/location.service';
import { MessageResponse } from 'src/misc/message-response';
import { UserLocationService } from 'src/user_location/user_location.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly locationService: LocationService,
    private readonly userLocationService: UserLocationService
  ) { }
  // mutation {
  //   create_user(createUserInput : 
  //     {
  //       first_name:"Nguyễn",
  //       last_name:"Khang",
  //       username:"KhangNguyen",
  //       password:"123",
  //       phone:"",
  //       email:"nguyenkhang1400@gmail.com"
  //       user_location:
  //       {
  //           id:"00007",
  //           address:"Số 3, đường 16"
  //       }
  //     }
  //   )
  //   {
  //    message
  //   }
  //  }
  @Mutation(() => MessageResponse, { name: 'create_user' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    //Check location
    let user_location = null;
    if (createUserInput.user_location) {
      user_location = await this.locationService.checkLocationByID(createUserInput.user_location.id)
      if (!user_location) {
        return {
          message: `Location not found !`
        }
      }
    }
    //Create user
    createUserInput.password =  await this.userService.hashPassword(createUserInput.password);
    const new_user = {
      ...createUserInput,
      user_location
    }
    const new_user_created: any = await this.userService.create(new_user)
    //Create location user
    if (user_location && new_user_created) {
      const new_user_location = await this.userLocationService.create(
        {
          user: new_user_created,
          location: user_location,
          address: createUserInput.user_location.address
        })
    }
    return {
      message: `Create data success: ${new_user_created.id}`
    }
  }

  @Query(() => User, { name: 'get_user_by_id' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
