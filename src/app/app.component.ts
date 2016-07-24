import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable }     from 'rxjs/Observable';

import {LessonsService , Lesson} from './services/lessons.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[LessonsService]
})
export class AppComponent {
  title = 'app works!';

  /* typescript のGeneric
  https://www.typescriptlang.org/docs/handbook/generics.html*/

  lessons$ : Observable<Lesson[]>;

  constructor( private lesson_service :LessonsService){

    this.lessons$ = this.lesson_service.loadLesson();

  }

  button_click = function(lesson_name, lesson_context){
    console.log(lesson_name, lesson_context);
    this.lesson_service.createLesson(lesson_name, lesson_context)
          .subscribe(
            ()=>{
              console.log("lesson saved successfully");
              this.lessons$ = this.lesson_service.loadLesson();
          },
            (err) => {console.log(err)},
            ()=>{console.log("completed")}
          );
  }
    
  


}
