import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../authentication/user.service';
import {Config} from '../config/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: UserModel;
  error: string;

  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private router: Router) {
    this.user = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['courses']);
    }
  }

  async signup() {
    const userArr = await this.httpClient.get<UserModel[]>(`${Config.USERS_API_URL}?email=${this.user.email}`)
      .toPromise();

    if (userArr[0] !== undefined) {
      this.error = 'Email already exists';
    } else {
      const registeredUser = await this.httpClient.post<UserModel>(`${Config.USERS_API_URL}`, this.user)
        .toPromise();
      this.router.navigate(['login']);
    }
  }

}
