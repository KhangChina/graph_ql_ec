import { Injectable } from '@nestjs/common';
import { UpdateUserLocationInput } from './dto/update-user_location.input';
import { UserLocation } from './entities/user_location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserLocationService {
  constructor(
    @InjectRepository(UserLocation) private userLocation: Repository<UserLocation>,
  ) { }
  async create(data: any) {
    const new_userLocation = await this.userLocation.create(data)
   // const 
    return 'This action adds a new userLocation';
  }

  findAll() {
    return `This action returns all userLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLocation`;
  }

  update(id: number, updateUserLocationInput: UpdateUserLocationInput) {
    return `This action updates a #${id} userLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLocation`;
  }
}
