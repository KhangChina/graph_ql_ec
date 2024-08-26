import { ObjectType, Field, Int } from '@nestjs/graphql';
import { District } from './district.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('province')
@ObjectType()
export class Province {

    @PrimaryColumn()
    @Field(() => String, { description: 'Example field (placeholder)' })
    id: string;

    @Column()
    @Field(() => String, { description: 'Example field (placeholder)' })
    name: string;

    @Column()
    @Field(() => String, { description: 'Example field (placeholder)' })
    level: string;

    @OneToMany(() => District, (district) => district.province)
    @Field(() => [District], { nullable: true })
    district: District[]

    constructor(id, name, level) {
        this.id = id;
        this.name = name;
        this.level = level;
    }
}

