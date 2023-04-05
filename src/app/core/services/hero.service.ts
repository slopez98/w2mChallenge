import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/baseUrl';
import { IHero } from '../models/heroDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url: string = BASE_URL

  constructor(
    private _htpp: HttpClient,

  ) { }


  getHeroById(id: IHero['id']): Observable<IHero> {
    return this._htpp.get<IHero>(`${this.url}/heroes/${id}`)
  }

  getTotalHeroes(): Observable<Array<IHero>> {
    return this._htpp.get<Array<IHero>>(`${this.url}/heroes`)
  }

  getHeroesForParam(param: string): Observable<Array<IHero>> {
    return this._htpp.get<Array<IHero>>(`${this.url}/heroes?q=${param}`)
  }

  createHero(body: IHero): Observable<any> {
    return this._htpp.post(`${this.url}/heroes`, body)
  }

  updateHero(body: IHero): Observable<any> {
    return this._htpp.put(`${this.url}/heroes/${body.id}`, body)
  }

  deleteHero(id: IHero['id']): Observable<any> {
    return this._htpp.delete(`${this.url}/heroes/${id}`)
  }
}
