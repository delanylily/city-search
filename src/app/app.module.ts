import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CountrySearchComponent } from './country-search/country-search.component';
import { CountriesService } from './services/countries.service';

@NgModule({
  declarations: [
    AppComponent,
    CountrySearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
