import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { Location } from './location/entities/location.entity';
import { LocationModule } from './location/location.module';
import { District } from './location/entities/district.entity';
import { Province } from './location/entities/province.entity';
import { UserModule } from './user/user.module';
import { UserLocationModule } from './user_location/user_location.module';
import { UserLocation } from './user_location/entities/user_location.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ec',
    entities: [Category,Location,District,Province,User,UserLocation],
    synchronize: true,
    logging:false,
  }), CategoryModule, LocationModule, UserModule, UserLocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
