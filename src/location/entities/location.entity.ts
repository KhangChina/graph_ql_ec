import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './district.entity';

@Entity('location')
@ObjectType()
export class Location {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Tên' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Cấp độ địa chỉ (Quận huyện, xã, phường, ...)' })
  level: string;

  @ManyToOne(() => District, (district) => district.id)
  @Field(() => District, { nullable: true })
  district: District;

}
