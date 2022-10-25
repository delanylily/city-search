import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.less']
})
export class CitySearchComponent implements OnInit {

  constructor(private cities: CitiesService) { }

  ngOnInit() {
    this.cities.getCityData('spain').subscribe((res: any) => console.log(res, 'hi'))
  }
}

