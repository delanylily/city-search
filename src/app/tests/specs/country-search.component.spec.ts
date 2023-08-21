import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { CountrySearchComponent } from '../../country-search/country-search.component';
import { CountriesService } from '../../services/countries.service';
import { countryDataResponse } from '../resources/country-search.resource';
import { countryInfo } from '../../models/country-info';
import { CountrySearchComponentPO } from '../page-objects/country-search.page-object';

export class CountriesServiceMock {
  getCountryData() { }
}

describe('YourComponent', () => {
  let component: CountrySearchComponent;
  let fixture: ComponentFixture<CountrySearchComponent>;
  let countriesService: CountriesService;
  let countryDataRes: any;
  let componentPO: CountrySearchComponentPO;

  beforeEach(() => {
    const mockService = jasmine.createSpyObj('CountriesService', ['getCountryData']);

    TestBed.configureTestingModule({
      declarations: [CountrySearchComponent],
      providers: [
        { provide: CountriesService, useClass: CountriesServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySearchComponent);
    componentPO = new CountrySearchComponentPO(fixture);
    component = fixture.componentInstance;
    countriesService = TestBed.inject(CountriesService);
    component.countryList = ['nz', 'uk', 'spain'];
    countryDataRes = spyOn(countriesService, 'getCountryData').and.returnValue(of(countryDataResponse));
    fixture.detectChanges();
  });

  it('should create an instance of the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCountryData and populate countryList on ngOnInit', () => {
    component.inputChanged.next('nz');

    fixture.detectChanges();

    expect(countryDataRes).toHaveBeenCalled();
  });

  it('should call getCountryData and populate countryInfo on countrySelected', () => {
    component.countrySelected(0);

    expect(countryDataRes).toHaveBeenCalledWith('nz');
    expect(component.countryInfo).toEqual(new countryInfo(countryDataResponse[0]));
  });

  it('should emit value on inputChanged', () => {
    const inputSpy = spyOn(component.inputChanged, 'next');
    componentPO.input().dispatchEvent(new KeyboardEvent('keyup', {
      'code': ''
    }));
    fixture.detectChanges();
    expect(inputSpy).toHaveBeenCalledWith('');
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    component.countrySelected(0);
    component.ngOnDestroy();
    expect(component.inputSubscription.closed).toBe(true);
    expect(component.countrySubscription?.closed).toBe(true);
  });
});
