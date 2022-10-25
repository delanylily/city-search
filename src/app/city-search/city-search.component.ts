import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { cityInfo } from '../models/city-info';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.less']
})
export class CitySearchComponent implements OnInit {
  cityInfo: cityInfo;

  constructor(private cities: CitiesService) {
  }

  ngOnInit() {
    this.cities.getCityData('spain').pipe(
      map(res => {
        console.log(res, ' res')
        this.cityInfo = new cityInfo(res[0]);
        console.log(this.cityInfo, 'cityIn')
      })
    ).subscribe();
  }
}

