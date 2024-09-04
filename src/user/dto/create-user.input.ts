import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateUserLocationInput } from 'src/user_location/dto/create-user_location.input';
import { UserLocation } from 'src/user_location/entities/user_location.entity';

@InputType()
export class CreateUserInput {
  
  @Field(() => String, { nullable: true, description: 'Username User' })
  username: string;

  @Field(() => String, { nullable: true, description: 'Password User' })
  password: string;

  @Field(() => String, { nullable: true, description: 'Last Name' })
  last_name: string;

  @Field(() => String, { nullable: true, description: 'First Name' })
  first_name: string;

  @Field(() => String, { nullable: true, description: 'Phone number' })
  phone: string;

  @Field(() => String, { nullable: true, description: 'Email' })
  email: string;

  @Field(() => CreateUserLocationInput, { nullable: true })
  user_location: CreateUserLocationInput;
}
