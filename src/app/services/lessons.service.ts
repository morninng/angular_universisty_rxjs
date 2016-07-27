import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/retryWhen';

@Injectable()
export class LessonsService {

  all_lessons : Lesson[]; 

  constructor(private http: Http) {
  }


  loadLesson(){
    return this.http.get('http://cxense.webdemo.dac.co.jp:3000/test/lesson_all').cache(1).map((res)=>{
      this.all_lessons = res.json()
      console.log("lesson has been loaded", this.all_lessons);
      return this.all_lessons;
    })
  }

  loadFixedLesson(){
    return this.http.get('http://cxense.webdemo.dac.co.jp:3000/test/lesson_sometime_fail')
            .retryWhen(error => error.delay(500))
            .cache(1)
            .map((res)=>{
              console.log("fixed lesson has been loaded");
              return res.json();
            })
  }

  LoadFilteredLesson(search : string  = ""){

    let params : URLSearchParams = new URLSearchParams();
    params.set("search", search);


    return this.http.get('http://cxense.webdemo.dac.co.jp:3000/test/FilteredLesson', {search:params})
      .cache(1)
      .map((res)=>{
      return res.json();
    })
  }



  get_all_lessons() : Lesson[]{
    return this.all_lessons;
  }

  createLesson(name, context){

    if(!name || !context){
      let empty_observable = Observable.empty();
      console.log("no name or no context");
      return empty_observable;
    }

    let lesson_json = {name: name, context: context};
    let lesson_str = JSON.stringify(lesson_json);　
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers})
    const network$ = this.http.post('http://cxense.webdemo.dac.co.jp:3000/test/lesson', lesson_json, options)
                        .cache(1);
/*
 ここで、network$は、serviceとcomponentの二ヶ所でsubscribeしているので、
 二回PostRequesstが呼ばれてしまう。
 cache オペレータを用いると、二度の無駄なPostRequestは実行されず、一回になる。
　ただし、Subscribe後に実行されるnextとcompleteは両方ともよばれる。
*/ 
    network$.subscribe(
      () =>{console.log("create lesson succeed : service")},
      (error) => {console.log("create lesson error" + error)},
      ()=>{console.log("create lesson complete: service")}
    )
    return network$;
  }

  deleteLesson(name_arr : string[]){

    if(!Array.isArray(name_arr) || name_arr.length == 0){
      let empty_observable = Observable.empty();
      console.log("no item to delete");
      return empty_observable;
    }


    let delete_lesson_str = JSON.stringify(name_arr);　
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let req_url = "http://cxense.webdemo.dac.co.jp:3000/test/lesson?name_arr=" + delete_lesson_str;

    const network$ = this.http.delete(req_url, options).cache(1);;
    network$.subscribe(
      () =>{console.log("delete lesson succeed : service")},
      (error)=>{console.log("delete lesson error", error)},
      ()=>{console.log("delete lesson complete: service")}
    )
    return network$;
  }

}


export interface Lesson {
  id : string,
  name : string,
  context : string
}