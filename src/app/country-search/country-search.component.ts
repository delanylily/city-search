import { Component, OnInit } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, map, Observable, of } from 'rxjs';
import { countryInfo } from '../models/country-info';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.less']
})
export class CountrySearchComponent implements OnInit {
  countryInfo: countryInfo;
  countryList: Array<any> = [];
  searchKeyupObservable: Observable<any>;
  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.countriesService.getAllCountries().pipe(
      map(res => {
        res.map((country: any) => {
          const countryName = country.name.common;
          this.countryList.push(countryName);
        })
      })
    ).subscribe();
  }


  filterCountries(value: any) {
    // return of(this.countryList.filter(country => country.indexOf(value) > 1)).pipe(
    //   delay(100)
    // );

    return of(this.countryList.filter((country) => {
      console.log(country.indexOf(value), 'country')
    }))
  }



  searchCountries(value: any) {
    this.filterCountries(value.key);
    this.searchKeyupObservable = value.key;
    console.log(value.key, 'value')
    this.searchKeyupObservable.pipe(
      debounceTime(300),
      map(key => key.target.value),
      distinctUntilChanged(),
    )
  }
}

