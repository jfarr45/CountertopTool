import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import { Subject } from 'rxjs';
//import {Subject} from 'rxjs';

  @Injectable()
  export class MeasuredCountertopsServiceProvider {
  
    countertops: any = [];
    dataChanged$: Observable<boolean>;
  
    private dataChangeSubject: Subject<boolean>;
  
    baseURL = "http://localhost:8080";

    constructor(public http: HttpClient) {
      console.log('Hello MeasuredCountertopsServiceProvider Provider');
  
      this.dataChangeSubject = new Subject<boolean>();
      this.dataChanged$ = this.dataChangeSubject.asObservable();
    }
  
    getUsers() {
      return new Promise(resolve => {
        this.http.get(this.baseURL+'/measuredcountertops').subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  
    private extractData(res: Response){
      let body = res;
      return body || [];
    }
  
    private handleError(error: Response | any){
      let errorMsg: string;
      if (error instanceof Response) {
        const err = error || '';
        errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;      
      } else {
        errorMsg = error.message ? error.message : error.toString();
      }
      console.error(errorMsg);
      return Observable.throw(errorMsg);
    }
  
    removeCountertop(id) {
      this.http.delete(this.baseURL + "/api/countertops/"+ id).subscribe(res => {
        this.countertops = res;
        this.dataChangeSubject.next(true);
      })
   
    }
  
    addNewCountertop(item) {
      this.http.post(this.baseURL + "/api/countertops", item).subscribe(res => {
        this.countertops = res;
        this.dataChangeSubject.next(true);
      })
    }
  
    editCountertop(item, id) {
     this.http.put(this.baseURL + "/api/countertops/"+ id, item).subscribe(res => {
       this.countertops = res;
       this.dataChangeSubject.next(true);
     })
  
    }
  
  }
