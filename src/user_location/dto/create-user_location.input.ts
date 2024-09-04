import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserLocationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
