import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { CitiesComponent } from './components/cities/cities.component';
import { CountriesComponent } from './components/countries/countries.component';

import { CitiesService } from './services/cities.service';
import { CountriesService } from './services/countries.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { LithuanianDateAdapter } from './classes/lithuanian-date-adapter';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryDialogComponent } from './components/dialogs/country/country.dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete/delete.dialog.component';
import { CityDialogComponent } from './components/dialogs/city/city.dialog.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CitiesComponent,
    CountryDialogComponent,
    DeleteDialogComponent,
    CityDialogComponent,
    NavBarComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: CountriesComponent
      },
      {
        path: 'cities/:country_id/:country_name',
        component: CitiesComponent
      }
    ])
  ],
  providers: [
    CountriesService,
    CitiesService,
    {provide: MAT_DATE_LOCALE, useValue: 'lt-LT'},
    {provide: DateAdapter, useClass: LithuanianDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
