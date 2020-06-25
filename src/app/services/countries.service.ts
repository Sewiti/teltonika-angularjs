import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryMinimal } from '../components/countries/countries.component';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private url = 'https://akademija.teltonika.lt/api3/countries';

  constructor(private http: HttpClient) {}


  getCountries(params?: {page?: string, order?: string, text?: string, date?: string}) {
    return this.http.get(this.url, { params, observe: 'response' });
  }

  getCountry(countryId: number) {
    return this.http.get(this.url + '/' + countryId, { observe: 'response' });
  }

  createCountry(country: CountryMinimal) {
    return this.http.post(this.url, country, { observe: 'response' });
  }

  updateCountry(countryId: number, country: CountryMinimal) {
    return this.http.put(this.url + '/' + countryId, country, { observe: 'response' });
  }

  deleteCountry(countryId: number) {
    return this.http.delete(this.url + '/' + countryId, { observe: 'response' });
  }
}
