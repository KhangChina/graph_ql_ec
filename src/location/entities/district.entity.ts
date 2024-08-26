import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Province } from './province.entity';
import { Location } from './location.entity';

@Entity('district')
@ObjectType()
export class District {

  @PrimaryColumn()
  @Field(() => String, { description: 'ID' })
  id: string;

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

  constructor(id, name, level, province) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.province = province
  }
}
