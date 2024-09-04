import { Injectable } from '@nestjs/common';
import { CreateUserLocationInput } from './dto/create-user_location.input';
import { UpdateUserLocationInput } from './dto/update-user_location.input';

@Injectable()
export class UserLocationService {
  create(createUserLocationInput: CreateUserLocationInput) {
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
