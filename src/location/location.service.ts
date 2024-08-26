import { Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import * as fs from 'fs';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Province) private province: Repository<Province>,
    @InjectRepository(District) private district: Repository<District>
  ) { }
  async migration_province() {
    const lstProvince = this.get_all_province()
    await this.province.upsert(lstProvince, ['id'])
  }

  async migration_district() {
    const lstProvince = this.get_all_province()
    let lstDistrict: District[] = []
    for (const key of lstProvince) {
      const lstDis = this.get_district_by_ID_province(key.id)
       lstDis.map(function (i) {
        lstDistrict.push(new District(i.id, i.name, i.level, key))
      })
    }
   await this.district.upsert(lstDistrict, ['id'])
  }

  async migration_location(){

  }

  get_all_province() {
    const data_province = fs.readFileSync('./src/location/json/province.json', 'utf-8')
    let province = JSON.parse(data_province)
    let response = province.map(function (item) {
      return new Province(item["Mã"], item["Tên"], item["Cấp"])
    })
    return response
  }

  get_district_by_ID_province(province_id: string) {
    const district = this.getAllDataDistrict()
    const res = district.filter((item) => item.province_id === province_id)
    return res
  }

  getAllDataDistrict() {
    const data = fs.readFileSync('./src/location/json/district.json', 'utf-8')
    let district = JSON.parse(data)
    var newData = district.map(function (item) {
      return {
        id: item["Mã"],
        name: item["Tên"],
        level: item["Cấp"],
        province_id: item["Mã TP"]
      };
    });
    return newData
  }

  getAllDataCommune() {
    const data = fs.readFileSync('./src/location/json/commune.json', 'utf-8')
    let commune = JSON.parse(data)
    var newData = commune.map(function (item) {
      return {
        "id": item["Mã"],
        "name": item["Tên"],
        "level": item["Cấp"],
        "district_id": item["Mã QH"]
      }
    })
    return newData
  }

  get_commune_by_ID_district(district_id: string) {
    const data_commune = this.getAllDataCommune()
    const res = data_commune.filter((item) => item.district_id === district_id)
    return res
  }
  
}
