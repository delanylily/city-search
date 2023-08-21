import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiUrl = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }

  searchByLanguage(language: string): Observable<any> {
    return this.http.get(`${this.apiUrl}lang/${language}`);
  }

  getCountryData(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}name/${name}`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
