import { Component , AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import {LessonsService , Lesson} from './services/lessons.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[LessonsService]
})
export class AppComponent implements AfterViewInit{
  title = 'app works!';

  /* typescript のGeneric
  https://www.typescriptlang.org/docs/handbook/generics.html
  */

  lessons$ : Observable<Lesson[]>;
  Fixedlessons$ : Observable<Lesson[]>;
  FilteredLesson_arr : Lesson[];




  constructor( private lesson_service :LessonsService){

    this.lessons$ = this.lesson_service.loadLesson();
    this.Fixedlessons$ = this.lesson_service.loadFixedLesson();
  
  }



/* https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
  コード内部に、dom を参照するdocument.getelementbyidがあるので、
  componentのViewができたあとに走るLifeCycleHookのngafterViewInitを用いる。
  Componentのclassに implements AfterViewInit　を付与する。
*/
  ngAfterViewInit(){  
    const filter_input = document.getElementById("filter_input").getElementsByTagName("input")[0];
    const search$ = Observable.fromEvent(filter_input, "keyup")
          .do(()=>{
             console.log(filter_input.value)
          })
          .switchMap(()=>{
            return this.lesson_service.LoadFilteredLesson(filter_input.value);
          })
    /*switchmapを用いることで、連続してキーボードを押されたときに、
    Nextに届く前のものは廃棄され、最後のものだけが評価され、onNextに渡る。
    Networkをみて、リクエストがキャンセルされていることを確認するべし。
    内部動作てきには、unsubscribeされているのと同じ動作かと思われる。 */


    search$.subscribe(
      (lesson_arr)=>{
        this.FilteredLesson_arr = lesson_arr
        console.log("next")
      },
      (err)=>{console.log(err)},
      ()=>{
        console.log("completed");
       }
    )
  }


  reload_fixed_lesson = function(){
    this.Fixedlessons$ = this.lesson_service.loadFixedLesson();
  }

  button_click = function(lesson_name, lesson_context){

    console.log(lesson_name, lesson_context);
    const createLesson$ = this.lesson_service.createLesson(lesson_name, lesson_context);


    let lesson_list : Lesson[] = this.lesson_service.get_all_lessons();
    console.log("lesson list" , lesson_list);
    let checked_lesson : string[] = []; 
    for(let lesson of lesson_list){
      let lesson_check_element
		      = document.getElementById("lesson_" + lesson.id ).getElementsByTagName("input")[0];
      let lesson_checked = lesson_check_element.checked;
      if(lesson_checked){
        console.log(lesson.id, "checked");
        checked_lesson.push(lesson.id);
      }
    }
    const deleteLesson$ =  this.lesson_service.deleteLesson(checked_lesson);

    const reload$ = this.lesson_service.loadLesson();


    const combined$ = Observable.concat(createLesson$, deleteLesson$, reload$)
              .subscribe(
                ()=>{
                  console.log("combined observable next");
                },
                (err)=>{
                  console.log(err);
                }, 
                ()=>{
                  console.log("combined observable completed");
                  this.lessons$ = reload$
                  /* reload$の実行はconcatの中にいれて実行させ、this.lesson$との紐付けはここで行う。
                  this.lessons$をConcatの中で実行させた場合でも、結局、このcompleteの中で紐付けが必要だった。なぜだろ？
                  */
                }
              );
  }



}
