import { Injectable } from '@angular/core';

import { Resource } from './resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private resourcesUrl = 'api/resources';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Resources from the server */
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.resourcesUrl)
      .pipe(
        tap(resources => this.log('fetched resources')),
        catchError(this.handleError('getResources', []))
      );
  }

  /** GET resource by code. Will 404 if code not found */
  getResource(code: number): Observable<Resource> {
    const url = `${this.resourcesUrl}/${code}`;
    return this.http.get<Resource>(url).pipe(
      tap(_ => this.log(`fetched resource code=${code}`)),
      catchError(this.handleError<Resource>(`getResource code=${code}`))
    );
  }

  /** PUT: update the resource on the server */
  updateResource(resource: Resource): Observable<any> {
    return this.http.put(this.resourcesUrl, resource, httpOptions).pipe(
      tap(_ => this.log(`updated resource code=${resource.code}`)),
      catchError(this.handleError<any>('updateResource'))
    );
  }

  /** POST: add a new resource to the server */
  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.resourcesUrl, resource, httpOptions).pipe(
      tap((newResource: Resource) => this.log(`added resource w/ code=${newResource.code}`)),
      catchError(this.handleError<Resource>('addResource'))
    );
  }

  /** DELETE: delete the resource from the server */
  deleteResource(resource: Resource | string): Observable<Resource> {
    const code = typeof resource === 'string' ? resource : resource.code;
    const url = `${this.resourcesUrl}/${code}`;

    return this.http.delete<Resource>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted resource code=${code}`)),
      catchError(this.handleError<Resource>('deleteResource'))
    );
  }

  /* GET resources whose name contains search term */
  searchResources(term: string): Observable<Resource[]> {
    if (!term.trim()) {
      // if not search term, return empty resource array.
      return of([]);
    }
    return this.http.get<Resource[]>(`${this.resourcesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found resources matching "${term}"`)),
      catchError(this.handleError<Resource[]>('searchResources', []))
    );
  }

  /** Log a ResourceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ResourceService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
