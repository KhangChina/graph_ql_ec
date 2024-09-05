import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { LocationModule } from 'src/location/location.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLocationModule } from 'src/user_location/user_location.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LocationModule,UserLocationModule],
  providers: [UserResolver, UserService],
})
export class UserModule { }
