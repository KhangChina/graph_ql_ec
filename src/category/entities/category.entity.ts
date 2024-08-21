import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
@ObjectType()
export class Category {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID Categories' })
  id: number;

  @Column()
  @Field(() => String, { nullable: true, description: 'Name Categories' })
  name: string;
}
