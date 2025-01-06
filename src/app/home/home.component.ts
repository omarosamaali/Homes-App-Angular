import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing/housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
   <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterHousingLocation(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingLocation of housingLocationItem" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houseingLocationList: HousingLocation[] = [];
  housingLocationItem: HousingLocation[] = [
 
  ];

  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
    this.getAllHousingLocations();
  }


  async getAllHousingLocations() {
    this.houseingLocationList = await this.housingService.getAllHouseingLocation();
    this.housingLocationItem = this.houseingLocationList;
    return this.getAllHousingLocations
  }

  filterHousingLocation(value: string) {
    if (!value) {
      this.housingLocationItem = this.houseingLocationList;
    }
    this.housingLocationItem = this.houseingLocationList.filter(housingLocation =>
      housingLocation.city.toLowerCase().includes(value.toLowerCase())
    )
  }
}
