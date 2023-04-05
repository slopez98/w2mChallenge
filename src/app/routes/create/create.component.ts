import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHero } from 'src/app/core/models/heroDTO';
import { HeroService } from 'src/app/core/services/hero.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formData: FormGroup

  constructor(
    private _heroService: HeroService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.formData = this._formBuilder.group({
      name: [null],
      realName: [null]
    })
  }

  ngOnInit(): void {

  }

  handleAddHero(isCreate: boolean) {
    if (isCreate && (this.formData?.controls['name'].value != null && this.formData.controls['realName'].value != null)) {
      this.createHero()
    }
    else this.formData?.markAllAsTouched()
  }

  createHero() {
    let body: IHero = this.formData?.value
    this._heroService.createHero(body).subscribe(
      response => {
        this.formData?.reset()
        this._snackBar.open('Héroe creado con éxito', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
        this._router.navigate(['home'])
      },
      error => {

      }
    )
  }
}
