import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, Subscription, switchMap } from 'rxjs';
import { countryInfo } from '../models/country-info';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.less']
})
export class CountrySearchComponent implements OnInit, OnDestroy {
  countryInfo: countryInfo;
  countryList: Array<any> = [];
  inputSubscription: Subscription;
  countrySubscription: Subscription;
  inputChanged: Subject<string> = new Subject<string>();

  constructor(private readonly countriesService: CountriesService) { }

  ngOnInit(): void {
    this.inputSubscription = this.inputChanged.pipe(
      switchMap((value) => this.countriesService.getCountryData(value))
    ).subscribe((data: any[]) => {
      this.countryList = data.map((country: any) => country.name.common);
    });
  }

  countrySelected(selectedCountryIndex: any) {
    const selected = this.countryList[selectedCountryIndex];
    this.countryList = [];
    this.countrySubscription = this.countriesService.getCountryData(selected).subscribe(data => {
      this.countryInfo = new countryInfo(data[0]);
    });
  }

  searchCountries(country: any) {
    this.inputChanged.next(country.target.value);
  }

  ngOnDestroy(): void {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
  }
}
