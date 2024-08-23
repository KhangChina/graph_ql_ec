import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Province } from './province.entity';
import { Location } from './location.entity';

@Entity('district')
@ObjectType()
export class District {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: 'Tên' })
  name: string;

  @Field(() => String, { description: 'Cấp độ' })
  level: string;

  @ManyToOne(() => Province, (province) => province.id)
  @Field(() => Province)
  province: Province;

  @OneToMany(() => Location, (location) => location.district)
  @Field(() => [Location], { nullable: true })
  locations: Location[];
  
}
