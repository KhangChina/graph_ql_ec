import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './district.entity';
import { UserLocation } from 'src/user_location/entities/user_location.entity';

@Entity('location')
@ObjectType()
export class Location {

  @PrimaryColumn()
  @Field(() => String, { description: 'ID' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Tên' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Cấp độ địa chỉ (Quận huyện, xã, phường, ...)' })
  level: string;

  @ManyToOne(() => District, (district) => district.id)
  @Field(() => District, { nullable: true })
  district: District;

  @OneToMany(() => UserLocation, userLocation => userLocation.location)
  @Field(() => UserLocation, { nullable: true })
  user_location: UserLocation[];

  constructor(id, name, level, district) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.district = district
  }
  
}
