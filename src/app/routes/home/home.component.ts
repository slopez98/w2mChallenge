import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IHero } from 'src/app/core/models/heroDTO';
import { IPagination } from 'src/app/core/models/paginationDTO';
import { HeroService } from 'src/app/core/services/hero.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private _heroService: HeroService,
    private _router: Router,
    public _dialog: MatDialog,
    private paginator: MatPaginatorIntl,
    private _snackBar: MatSnackBar
  ) {
    this.paginator.itemsPerPageLabel = 'Elementos por página'
    this.paginator.previousPageLabel = 'Atrás'
    this.paginator.nextPageLabel = 'Siguiente'
  }

  heroesList: Array<IHero> = []
  infoDataPagination: IPagination = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0
  }
  heroesListOrdered: Array<IHero> = []

  ngOnInit(): void {
    this.getHero(this.infoDataPagination)
  }

  getHero(params: IPagination) {
    return this._heroService.getTotalHeroes().subscribe((response) => {
      this.heroesList = response
      this.returnOrderedList(response, params)
    }
    )
  }

  getHeroesForParams(searchParams: string) {
    return this._heroService.getHeroesForParam(searchParams).subscribe((response) => {
      this.heroesList = response
      this.returnOrderedList(response, {
        pageIndex: 0,
        pageSize: response.length,
        previousPageIndex: 0
      })
    }
    )
  }

  returnOrderedList(listHeroes: Array<IHero>, params: IPagination): Array<IHero> {
    const start = params.pageIndex * params.pageSize;
    const end = start + params.pageSize;
    return this.heroesListOrdered = listHeroes.slice(start, end);
  }

  handleChangeOrderedList(newParamsEvent: IPagination) {
    if (newParamsEvent) {
      let newPagination: IPagination = {
        pageIndex: newParamsEvent.pageIndex,
        pageSize: newParamsEvent.pageSize,
        previousPageIndex: this.infoDataPagination?.pageIndex
      }
      this.infoDataPagination = newPagination
      this.returnOrderedList(this.heroesList, newPagination)
    }
  }

  handleNavigateNewHero(isNewHero: boolean) {
    if (isNewHero) {
      this._router.navigate(['create'])
    }
  }

  handleOpenModalDelete(hero: IHero) {
    this._dialog.open(ModalComponent, { data: hero })
      .afterClosed().subscribe(state => {
        if (state) return this.deleteHeroById(hero.id)
      })
  }

  deleteHeroById(id: IHero['id']) {
    if (id) {
      this._heroService.deleteHero(id).subscribe(
        response => {
          this.getHero({
            pageIndex: 0,
            pageSize: 5,
            previousPageIndex: -1
          })
          this._snackBar.open('Héroe eliminado con éxito', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          })
        }

      )
    }
  }

  handleUpdateRedirectHero(id: IHero['id']) {
    if (id) {
      this._router.navigate([`edit/${id}`])
    }
  }

  handleSearchEvent(search: string) {
    if (!search) return this.getHero(this.infoDataPagination)
    else return this.getHeroesForParams(search.toLowerCase())
  }
}
