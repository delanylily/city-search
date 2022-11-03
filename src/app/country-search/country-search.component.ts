import { Component } from '@angular/core';
import { fromEvent, map, switchMap } from 'rxjs';
import { countryInfo } from '../models/country-info';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.less']
})
export class CountrySearchComponent {
  countryInfo: countryInfo;
  countryList: Array<any> = [];
  input: any;
  term: any;
  selectedCountry: string;
  constructor(private countriesService: CountriesService) { }

  countrySelected(country: any) {
    this.selectedCountry = this.countryList[country];
    this.countryList = [];
    this.countriesService.getCountryData(this.selectedCountry).subscribe(data => {
      this.countryInfo = new countryInfo(data[0]);
    })
  }

  searchCountries() {
    this.input = document.getElementById('search-input');
    const search$ = fromEvent(this.input, 'keyup')
      .pipe(
        map((search: any) => {
          this.term = search.target.value;
        }),
        switchMap(() => this.countriesService.getCountryData(this.term)));
    search$.subscribe(countries => {
      this.countryList = []
      countries.map((country: any) => {
        this.countryList.push(country.name.common);
      })
    })
  }
}
