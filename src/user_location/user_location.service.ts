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
    try {
      const save_userLocation = await this.userLocation.save(new_userLocation);
      return save_userLocation ? save_userLocation : null;
    } catch (error) {
      console.error('Error saving userLocation:', error);
      return null;
    }
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
