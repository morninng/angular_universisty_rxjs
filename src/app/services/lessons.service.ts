import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LessonsService {

  constructor(private http: Http) {
  }


  loadLesson(){
    return this.http.get('http://cxense.webdemo.dac.co.jp:3000/test/lesson_all').map((res)=>{
      return res.json();
    })
  }

  createLesson(name, context){
    let lesson_json = {name: name, context: context};
    let lesson_str = JSON.stringify(lesson_json);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers})
    const network$ = this.http.post('http://cxense.webdemo.dac.co.jp:3000/test/lesson', lesson_json, options)

    return network$;
  }

}


export interface Lesson {
  name : string,
  context : string
}