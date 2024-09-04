import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID Users' })
  id: number;
  
  @Column()
  @Field(() => String, { nullable: true, description: 'Username User' })
  username: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'Password User' })
  password: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'Last Name' })
  last_name: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'First Name' })
  first_name: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'Phone number' })
  phone: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'Email' })
  email: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'Status active: true, false' })
  isEmail: string;

  @Column()
  @Field(() => String, { nullable: true, description: 'Status active: true, false' })
  isPhone: string;
  
}
