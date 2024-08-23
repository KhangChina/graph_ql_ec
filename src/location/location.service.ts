import { Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import * as fs from 'fs';
@Injectable()
export class LocationService {

  get_all_province() {
    const data_province = fs.readFileSync('./src/location/json/province.json', 'utf-8')
    let province = JSON.parse(data_province)
    let response = province.map(function (item) {
      return {
        id: item["Mã"],
        name: item["Tên"],
        level: item["Cấp"],
      }
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
        "id": item["Mã"],
        "name": item["Tên"],
        "level": item["Cấp"],
        "province_id": item["Mã TP"]
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
