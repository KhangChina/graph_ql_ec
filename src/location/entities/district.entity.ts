import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Province } from './province.entity';
import { Location } from './location.entity';

@Entity('district')
@ObjectType()
export class District {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Tên' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Cấp độ' })
  level: string;

  @ManyToOne(() => Province, (province) => province.id)
  @Field(() => Province, { nullable: true })
  province: Province;

  @OneToMany(() => Location, (location) => location.district)
  @Field(() => [Location], { nullable: true })
  locations: Location[];
  
}
