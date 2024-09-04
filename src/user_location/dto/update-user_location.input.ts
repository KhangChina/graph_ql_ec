import { CreateUserLocationInput } from './create-user_location.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserLocationInput extends PartialType(CreateUserLocationInput) {

}
