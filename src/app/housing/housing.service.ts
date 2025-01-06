import { HousingLocation } from './../housing-location';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  protected housingLocation: HousingLocation[] = [];
  
  constructor() { }

  url = 'http://localhost:3000/locations'

  async getAllHouseingLocation(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json();
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email)
  }

}
