import { ComponentFixture } from "@angular/core/testing";
import { CountrySearchComponent } from "src/app/country-search/country-search.component";

export class CountrySearchComponentPO {
  fixture: ComponentFixture<CountrySearchComponent>;

  constructor(fixture) {
    this.fixture = fixture;
  }

  input() {
    return this.fixture.nativeElement.querySelector('input');
  }
}
