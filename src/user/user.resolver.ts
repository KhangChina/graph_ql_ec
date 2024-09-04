import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }
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
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log(createUserInput)
    return this.userService.create(createUserInput);
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
