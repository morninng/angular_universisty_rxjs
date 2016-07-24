import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LessonsService {

  constructor(private http: Http) {
  }


  loadLesson(){
    return this.http.get('http://cxense.webdemo.dac.co.jp:3000/test/lesson').map((res)=>{
      return res.json();
    })
  }

}


export interface Lesson {
  name : string,
  context : string
}