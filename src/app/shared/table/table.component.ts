import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { IHero } from 'src/app/core/models/heroDTO';
import { IPagination } from 'src/app/core/models/paginationDTO';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input('heroesList') heroesList: IHero[] = [];
  @Output() deleteHeroEvent = new EventEmitter<IHero>()
  @Output() updateHeroEvent = new EventEmitter<IHero['id']>()

  handleDeleteItem(hero: IHero) {
    this.deleteHeroEvent.emit(hero)
  }

  handleEditItem(id: IHero['id']) {
    this.updateHeroEvent.emit(id)
  }
  displayedColumns: string[] = ['position', 'name', 'realName', 'actions'];

}
