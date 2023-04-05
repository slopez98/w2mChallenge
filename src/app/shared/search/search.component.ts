import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.searchForm = this._formBuilder.group({
      searchValue: ['']
    })
  }

  @Output() searchEvent = new EventEmitter<string>()


  handleSearchEvent(event: Event | string) {
    if (typeof event === 'string') {
      this.searchEvent.emit(event)
    }
    else {
      const search: any = event.target
      this.searchEvent.emit(search.value)
    }
  }

}
