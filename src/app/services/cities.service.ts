import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityMinimal } from '../components/cities/cities.component';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private url = 'https://akademija.teltonika.lt/api3/cities';

  constructor(private http: HttpClient) { }


  getCities(country_id?: number, params?: {page?:string, order?:string, text?:string, date?:string}) {
    let _url = (country_id == null) ? (this.url) : (this.url + '/' + country_id);
    return this.http.get(_url, { params: params, observe: 'response' });
  }

  createCity(city: CityMinimal) {
    return this.http.post(this.url, city, { observe: 'response' });
  }

  updateCity(city_id: number, city: CityMinimal) {
    return this.http.put(this.url + '/' + city_id, city, { observe: 'response' });
  }

  deleteCity(city_id: number) {
    return this.http.delete(this.url + '/' + city_id, { observe: 'response' });
  }
}
