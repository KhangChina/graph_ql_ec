import { Module } from '@nestjs/common';
import { UserLocationService } from './user_location.service';
import { UserLocationResolver } from './user_location.resolver';
import { UserLocation } from './entities/user_location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserLocation])],
  providers: [UserLocationResolver, UserLocationService],
})
export class UserLocationModule {}
