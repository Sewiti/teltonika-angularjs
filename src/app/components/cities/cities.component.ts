import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesService } from '../../services/cities.service';
import { MatDialog } from '@angular/material/dialog';
import { CityDialogComponent, CityDialogType } from '../dialogs/city/city.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface CityMinimal {
  name: string;
  area: number;
  population: number;
  postcode: string;
  country_id: number;
}

export interface City extends CityMinimal {
  id: number;
  created_at: string;
}


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  displayedColumns = ['name', 'area', 'population', 'postcode', 'actions'];

  countryId: number;
  countryName: string;
  cities: City[] = [];
  loading = true;
  hasNext: boolean;

  params: {
    page?: string,
    order?: string,
    text?: string,
    date?: string
  };


  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CitiesService
  ) {}


  ngOnInit(): void {
    this.countryId   = +this.activatedRoute.snapshot.paramMap.get('countryId');
    this.countryName =  this.activatedRoute.snapshot.paramMap.get('countryName');

    this.activatedRoute.queryParamMap.subscribe(query => {
      this.params = {};

      if (query.has('page'))  { this.params.page  = query.get('page');  }
      if (query.has('order')) { this.params.order = query.get('order'); }
      if (query.has('text'))  { this.params.text  = query.get('text');  }
      if (query.has('date'))  { this.params.date  = query.get('date');  }

      this.refreshCities();
    });
  }


  goBack() {
    this.router.navigate(
      [''],
      {
        queryParams: {
          page:  this.activatedRoute.snapshot.queryParamMap.get('countryPage'),
          order: this.activatedRoute.snapshot.queryParamMap.get('countryOrder'),
          text:  this.activatedRoute.snapshot.queryParamMap.get('countryText'),
          date:  this.activatedRoute.snapshot.queryParamMap.get('countryDate')
        }
      }
    );
  }


  refreshCities() {
    this.service.getCities(this.countryId, this.params).subscribe(response => {
      if (response.status !== 200) {
        this.pushNotification('Nepavyko gauti miestų');
        return;
      }

      // console.log(response);
      this.cities = response.body as any[];  // .cities ??
      this.loading = false;


      // Pagination compensating cuz of bad api:)
      if (this.cities.length < 10) {
        this.hasNext = false;
      }
      else {
        const temp = Object.create(this.params);
        temp.page = (temp.page ? +temp.page + 1 : 2).toString();

        this.service.getCities(this.countryId, temp).subscribe(subResponse => {
          this.hasNext = (subResponse.body as any[]).length > 0;
        });
      }
    });
  }


  newCityDialog() {
    const dialogRef = this.dialog.open(CityDialogComponent, {
      width: '400px',
      data: {
        type: CityDialogType.create,
        country_id: this.countryId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createCity(result.city).subscribe(response => {
          this.pushNotification(
            response.status === 200 ?
            'Miestas sėkmingai sukurtas' :
            'Nepavyko sukurti miesto'
          );

          // console.log(response);
          this.refreshCities();
        });
      }
    });
  }


  editCityDialog(city: City)
  {
    const dialogRef = this.dialog.open(
      CityDialogComponent,
      {
        width: '400px',
        data: {
          type: CityDialogType.edit,
          country_id: this.countryId,
          city
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateCity(result.id, result.city).subscribe(response => {
          this.pushNotification(
            response.status === 200 ?
            'Miestas sėkmingai išsaugotas' :
            'Nepavyko išsaugoti miesto'
          );

          // console.log(response);
          this.refreshCities();
        });
      }
    });
  }


  deleteCityDialog(city: City)
  {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        width: '400px',
        data: { title: city.name }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.service.deleteCity(city.id).subscribe(response => {
          this.pushNotification(
            response.status === 200 ?
            'Miestas sėkmingai ištrintas' :
            'Nepavyko ištrinti miesto'
          );

          // console.log(response);
          this.refreshCities();
        });
      }
    });
  }


  pushNotification(message: string) {
    this.snackBar.open(
      message,
      'Uždaryti',
      {
        duration: 3000,
      }
    );
  }


  orderButtonClick() {
    let newOrder: string;

    switch (this.params.order) {
      case 'asc':  { newOrder = 'desc';    break; }
      case 'desc': { newOrder = undefined; break; }
      default:     { newOrder = 'asc';     break; }
    }

    this.router.navigate(
      ['cities', this.countryId, this.countryName],
      {
        queryParams: {
          order: newOrder
        },
        queryParamsHandling: 'merge'
      }
    );
  }
}
