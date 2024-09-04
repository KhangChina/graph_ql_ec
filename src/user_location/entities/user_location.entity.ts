import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity('user_location')
@ObjectType()
export class UserLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Location, location => location.id)
  @Field(() => Location, { nullable: true })
  location: Location;

  @Column({ nullable: true })
  @Field(() => String, { description: 'Address' })
  address: string;

}
