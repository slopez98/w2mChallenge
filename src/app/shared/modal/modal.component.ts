import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHero } from 'src/app/core/models/heroDTO';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(
    public _dialogReference: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHero,

  ) { }

}
