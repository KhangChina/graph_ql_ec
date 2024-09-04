import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { LocationModule } from 'src/location/location.module';

@Module({
  providers: [UserResolver, UserService],
  imports:[LocationModule]
})
export class UserModule {}
