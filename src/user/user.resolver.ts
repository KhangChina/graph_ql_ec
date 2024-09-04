import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LocationService } from 'src/location/location.service';
import { MessageResponse } from 'src/misc/message-response';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly locationService: LocationService

  ) { }
  // mutation {
  //   createUser(createUserInput : 
  //     {
        
  //       first_name:"Nguyễn",
  //       last_name:"Khang",
  //       username:"KhangNguyen",
  //       password:"123",
  //       phone:"",
  //       email:"nguyenkhang1400@gmail.com"
  //       user_location:
  //       {
  //           id:"3",
  //           address:"Số 3, đường 16"
  //       }
  //     }
  //   )
  //   {
  //    username
  //   }
  // }
  @Mutation(() => MessageResponse,{ name: 'create_user' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
   // return await this.userService.create(createUserInput);
    //Check location
    const user_location = await this.locationService.checkLocationByID(createUserInput.user_location.id)
    if(!user_location)
    {
      return {
        message: `Location not found !`
      }
    }
    //Create user
    const new_user = {
      ...createUserInput,
      user_location
    }
    const new_created = await this.userService.create(new_user)
    console.log(new_created)
    //Get location
    return {
      message: `ok`
    }
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
