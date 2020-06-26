import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { City, CityMinimal } from '../../cities/cities.component';


export enum CityDialogType {create = 0, edit = 1}

export interface CityDialogData {
  type: CityDialogType;
  countryId?: number;
  city?: City;
}


@Component({
  selector: 'app-city.dialog',
  templateUrl: './city.dialog.component.html',
  styleUrls: ['./city.dialog.component.css']
})
export class CityDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CityDialogData)
  {
    if (data.type === CityDialogType.edit) {
      this.form.setValue({
        name: data.city.name,
        area: data.city.area,
        population: data.city.population,
        postcode: data.city.postcode
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

    postcode: new FormControl(null, [
      Validators.required,
      Validators.pattern('[A-Za-z0-9]{2,3}[0-9]{0,2}[- ]?[0-9]{2,5}')
    ])
  });


  get name()       { return this.form.get('name');       }
  get area()       { return this.form.get('area');       }
  get population() { return this.form.get('population'); }
  get postcode()   { return this.form.get('postcode');   }


  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        id: this.data.city?.id,
        city: {
          name: this.name.value,
          area: this.area.value,
          population: this.population.value,
          postcode:   this.postcode.value,
          country_id: this.data.countryId || this.data.city.country_id
        } as CityMinimal
      });
    }
  }
}
