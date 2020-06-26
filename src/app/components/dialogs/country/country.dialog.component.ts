import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country, CountryMinimal } from '../../countries/countries.component';

export enum CountryDialogType {create = 0, edit = 1}

export interface CountryDialogData {
  type: CountryDialogType;
  country?: Country;
}


@Component({
    selector: 'app-country.dialog',
    templateUrl: './country.dialog.component.html',
    styleUrls: ['./country.dialog.component.css'],
})
export class CountryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountryDialogData)
  {
    if (data.type === CountryDialogType.edit) {
      this.form.setValue({
        name: data.country.name,
        area: data.country.area,
        population:    data.country.population,
        calling_code: +data.country.calling_code
      });
    }
  }

  form = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž ]+')
    ]),

    area: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(500000000)
    ]),

    population: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(10000000000),
      Validators.pattern('[0-9]+')
    ]),

    calling_code: new FormControl(null, [
      Validators.required,
      Validators.min(9),
      Validators.max(9999)
    ])
  });


  get name()         { return this.form.get('name');         }
  get area()         { return this.form.get('area');         }
  get population()   { return this.form.get('population');   }
  get calling_code() { return this.form.get('calling_code'); }


  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        id: this.data.country?.id,
        country: {
          name: this.name.value,
          area: this.area.value,
          population: this.population.value,
          calling_code: '+' + this.calling_code.value
        } as CountryMinimal
      });
    }
  }
}
