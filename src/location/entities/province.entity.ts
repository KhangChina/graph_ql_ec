import { ObjectType, Field, Int } from '@nestjs/graphql';
import { District } from './district.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('province')
@ObjectType()
export class Province {
    
    @PrimaryGeneratedColumn()
    @Field(() => Int, { description: 'Example field (placeholder)' })
    id: number;

    @Column()
    @Field(() => String, { description: 'Example field (placeholder)' })
    name: string;

    @Column()
    @Field(() => String, { description: 'Example field (placeholder)' })
    level: string;

    @OneToMany(() => District, (district) => district.province)
    @Field(() => [District], { nullable: true })
    district: District[]

}

