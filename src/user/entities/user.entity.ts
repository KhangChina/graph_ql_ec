import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserLocation } from 'src/user_location/entities/user_location.entity';

import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
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

  @OneToMany(() => UserLocation, userLocation => userLocation.user)
  @Field(() => UserLocation, { nullable: true })
  user_location: UserLocation[];

}
