import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class LessonsService {

  constructor(private http: Http) {
  }


  loadLesson(){
    return this.http.get('http://cxense.webdemo.dac.co.jp:3000/test/lesson');
  }

}


export interface Lesson {
  name : string,
  context : string
}