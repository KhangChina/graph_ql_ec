import { ObjectType, Field, Int } from '@nestjs/graphql';
import { District } from './district.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity('province')
@ObjectType()
export class Province {
    
    @Field(() => Int, { description: 'Example field (placeholder)' })
    id: number;

    @Field(() => String, { description: 'Example field (placeholder)' })
    name: string;

    @Field(() => String, { description: 'Example field (placeholder)' })
    level: string;

    @OneToMany(() => District, (district) => district.province)
    @Field(() => [District], { nullable: true })
    district: District[]
}

