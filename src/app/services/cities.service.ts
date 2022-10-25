import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  apiUrl = 'https://restcountries.com/v3.1/name';

  constructor(private http: HttpClient) { }

  getCityData(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`)
  }
}
