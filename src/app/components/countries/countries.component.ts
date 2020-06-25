import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CountryDialogComponent, CountryDialogType } from '../dialogs/country/country.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface CountryMinimal {
  name: string;
  area: number;
  population: number;
  calling_code: string;
}

export interface Country extends CountryMinimal {
  id: number;
  created_at: string;
}


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  displayedColumns = ['name', 'area', 'population', 'calling_code', 'actions'];

  countries: Country[] = [];
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
    public service: CountriesService
  ) {}


  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(query => {
      this.params = {};

      if (query.has('page'))  { this.params.page  = query.get('page');  }
      if (query.has('order')) { this.params.order = query.get('order'); }
      if (query.has('text'))  { this.params.text  = query.get('text');  }
      if (query.has('date'))  { this.params.date  = query.get('date');  }

      this.refreshCountries();
    });
  }


  refreshCountries() {
    this.service.getCountries( this.params ).subscribe(response => {
      if (response.status !== 200) {
        this.pushNotification('Nepavyko gauti šalių');
        return;
      }

      this.countries = (response.body as any).countires; // count i res ??
      this.loading = false;


      // Pagination compensating cuz of bad api:)
      if (this.countries.length < 10) {
        this.hasNext = false;
      }
      else {
        const temp = Object.create(this.params);
        temp.page = (temp.page ? +temp.page + 1 : 2).toString();

        this.service.getCountries( temp ).subscribe(subResponse => {
          this.hasNext = (subResponse.body as any).count > 0;
        });
      }
    });
  }


  newCountryDialog() {
    const dialogRef = this.dialog.open(CountryDialogComponent, {
      width: '400px',
      data: {type: CountryDialogType.create}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createCountry(result.country).subscribe(response => {
          this.pushNotification(
            response.status === 200 ?
            'Šalis sėkmingai sukurta' :
            'Nepavyko sukurti šalies'
          );

          console.log(response);
          this.refreshCountries();
        });
      }
    });
  }


  editCountryDialog(country: Country)
  {
    const dialogRef = this.dialog.open(CountryDialogComponent, {
      width: '400px',
      data: {
        type: CountryDialogType.edit,
        country
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateCountry(result.id, result.country).subscribe(response => {
          this.pushNotification(
            response.status === 200 ?
            'Šalis sėkmingai išsaugota' :
            'Nepavyko išsaugoti šalies'
          );

          // console.log(response);
          this.refreshCountries();
        });
      }
    });
  }


  deleteCountryDialog(country: Country)
  {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        width: '400px',
        data: { title: country.name }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.service.deleteCountry(country.id).subscribe(response => {
          this.pushNotification(
            response.status === 200 ?
            'Šalis sėkmingai ištrinta' :
            'Nepavyko ištrinti šalies'
          );

          // console.log(response);
          this.refreshCountries();
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
      [''],
      {
        queryParams: {
          order: newOrder
        },
        queryParamsHandling: 'merge'
      }
    );
  }
}
