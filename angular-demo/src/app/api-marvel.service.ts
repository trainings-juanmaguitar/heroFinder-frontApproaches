import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { PUBLIC_KEY } from '../config.js'
const BASE_URL_API = "https://gateway.marvel.com/v1/public/"

const getUrlApiSearch = query =>
  `${BASE_URL_API}characters?nameStartsWith=${query}&apikey=${PUBLIC_KEY}`

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {

  constructor(
    public http: HttpClient
  ) {}

   searchHeroes (query='spider'): Observable<any> {
    const url = getUrlApiSearch(query)
    return this.http.get(url)
  }

}
