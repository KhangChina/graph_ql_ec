import { Field, InputType } from '@nestjs/graphql';
import { CreateLocationInput } from 'src/location/dto/create-location.input';

@InputType()
export class CreateUserLocationInput {

  @Field(() => String, { description: 'ID' })
  id: string;

  @Field(() => String, { description: 'Address' })
  address: string;

}
