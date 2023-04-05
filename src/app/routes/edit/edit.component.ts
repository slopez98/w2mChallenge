import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero } from 'src/app/core/models/heroDTO';
import { HeroService } from 'src/app/core/services/hero.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formData: FormGroup;
  idHeroFromUrl: string

  constructor(
    private _routerActivated: ActivatedRoute,
    private _heroesServices: HeroService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar

  ) {
    this.idHeroFromUrl = this._routerActivated.snapshot.params['id'];
    this.formData = this._formBuilder.group({
      id: [null],
      name: [null],
      realName: [null]
    })
  }

  ngOnInit() {
    if (this.idHeroFromUrl) {
      this.getHeroById(parseInt(this.idHeroFromUrl))
    }
  }

  getHeroById(id: IHero['id']) {
    this._heroesServices.getHeroById(id).subscribe(
      response => {
        this.formData.patchValue(response)
      }
    )
  }

  handleUpdateHero(isEdit: boolean) {
    if (isEdit && (this.formData.controls['name'].value != null && this.formData.controls['realName'].value != null)) {
      this._heroesServices.updateHero(this.formData.value).subscribe(
        response => {
          this.formData.reset()
          this._snackBar.open('Héroe editado con éxito', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          })
          this._router.navigate(['home'])
        }
      )
    }
    else this.formData.markAllAsTouched()
  }

}
