import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countryUrl = 'https://restcountries.com/v3.1/name';

  apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  getCountryData(name: string): Observable<any> {
    return this.http.get(`${this.countryUrl}/${name}`)
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
}
