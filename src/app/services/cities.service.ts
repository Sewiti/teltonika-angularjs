import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityMinimal } from '../components/cities/cities.component';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private url = 'https://akademija.teltonika.lt/api3/cities';

  constructor(private http: HttpClient) { }


  getCities(countryId?: number, params?: {page?: string, order?: string, text?: string, date?: string}) {
    const url = (countryId) ? (this.url + '/' + countryId) : (this.url);
    return this.http.get(url, { params, observe: 'response' });
  }

  createCity(city: CityMinimal) {
    return this.http.post(this.url, city, { observe: 'response' });
  }

  updateCity(cityId: number, city: CityMinimal) {
    return this.http.put(this.url + '/' + cityId, city, { observe: 'response' });
  }

  deleteCity(cityId: number) {
    return this.http.delete(this.url + '/' + cityId, { observe: 'response' });
  }
}
