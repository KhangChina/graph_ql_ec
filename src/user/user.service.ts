import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
  ) { }
  async create(data: any) {
    const user_new = await this.user.create(data)
    try {
      const savedUser = await this.user.save(user_new);
      return savedUser ? savedUser : null;
    } catch (error) {
      console.error('Error saving user:', error);
      return null;
    }
  }

  findAll() {
    return `This action returns all user`;
  }
  // query {
  //   get_user_by_id(id:"3f580816-efd6-4008-bc7a-81b42faef1a0"){
  //     username
  //     last_name
  //     first_name
  //   }
  //  }
  async findOne(id: string) {
    return await this.user.findOne({ where: { id: id } })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 5; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash);
    return match;
  }

}
