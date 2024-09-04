import { Module } from '@nestjs/common';
import { UserLocationService } from './user_location.service';
import { UserLocationResolver } from './user_location.resolver';

@Module({
  providers: [UserLocationResolver, UserLocationService],
})
export class UserLocationModule {}
