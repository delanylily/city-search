export class countryInfo {
  name: any;
  capital: any;
  continent: any;
  flag: string;
  language: any;
  independent: boolean;

  constructor(value: any) {
    this.name = value.name.common;
    this.capital = value.capital;
    this.continent = value.continents[0];
    this.flag = value.flag;
    this.language = value.languages[Object.keys(value.languages)[0]];
    this.independent = value.independent;
  }
}
