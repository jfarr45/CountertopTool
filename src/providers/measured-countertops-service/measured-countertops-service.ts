import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Subject } from 'rxjs';
//import {Subject} from 'rxjs';

  @Injectable()
  export class MeasuredCountertopsServiceProvider {
  
    countertops: any = [];
    dataChanged$: Observable<boolean>;
  
    private dataChangeSubject: Subject<boolean>;
  
    baseURL = "https://countertop-tool.herokuapp.com/";

    constructor(public http: HttpClient) {
      console.log('Hello MeasuredCountertopsServiceProvider Provider');
  
      this.dataChangeSubject = new Subject<boolean>();
      this.dataChanged$ = this.dataChangeSubject.asObservable();
    }
  
    getCountertops() {
      return new Promise(resolve => {
        this.http.get(this.baseURL+'/measuredcountertops').subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }

    addCountertop(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.baseURL+'/measurecountertops', JSON.stringify(data))
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
  }