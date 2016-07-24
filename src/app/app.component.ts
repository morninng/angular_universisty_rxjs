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
  
  lessons : Lesson[];

  constructor( private lesson_service :LessonsService){

    const lesson$ = this.lesson_service.loadLesson();

    lesson$.subscribe(
      (res)=>{
        console.log(res);
        this.lessons = res.json();
      },
      (error)=>{
        console.log(error.message);
      },
      ()=>{
        console.log("completed");
      }
    )

  }




}
