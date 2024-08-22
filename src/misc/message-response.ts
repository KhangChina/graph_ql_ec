import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class MessageResponse {
    @Field(() => String)
    message: string;
}