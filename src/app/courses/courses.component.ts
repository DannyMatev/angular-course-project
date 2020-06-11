import {Component, OnInit} from '@angular/core';
import {CourseModel} from '../model/course.model';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../authentication/user.service';
import {Config} from '../config/config';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: CourseModel[];

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  ngOnInit() {
    this.fetchCourses();
  }

  async fetchCourses() {
    this.courses = await this.httpClient.get<CourseModel[]>(`${Config.COURSES_API_URL}`)
      .toPromise();
    console.log(this.courses);
  }
}
