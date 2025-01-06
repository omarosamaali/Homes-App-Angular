import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing/housing.service";
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  template: `
    <article>
      <section class="listing-heading">
        <div>
          <img
            src="{{ houseingLocation?.photo }}"
            class="listing-photo"
            alt="image"
          />
        </div>
        <h2 class="listing-name">{{ houseingLocation?.name }}</h2>
        <p class="listing-location">
          {{ houseingLocation?.city }}, {{ houseingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2>About this housing location:</h2>
        <ul>
          <li>Units Available: {{ houseingLocation?.availableUnits }}</li>
          <li>
            Does this location have wifi:
            {{ houseingLocation?.wifi ? "Yes" : "No" }}
          </li>
          <li>
            Does this location have laundry:
            {{ houseingLocation?.laundry ? "Yes" : "No" }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply Now</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName">

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">

          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
  houseingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  submitApplication() {
    this.housinglocation.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
  
  constructor(
    private route: ActivatedRoute,
    private housinglocation: HousingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.housinglocation.getHousingLocationById(id).then(hl => {
      this.houseingLocation = hl
    })
  }
}
