import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Location,Province,District])],
  providers: [LocationResolver, LocationService],
})
export class LocationModule { }
