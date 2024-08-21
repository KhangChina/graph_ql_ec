import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: true, description: 'Name Categories' })
  name: string;
}
