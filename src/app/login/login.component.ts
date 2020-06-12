import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../authentication/user.service';
import {Router} from '@angular/router';
import {Config} from '../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  error: string;
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient,
              private userService: UserService,
              private router: Router) {
    this.httpClient = httpClient;
    this.user = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['courses']);
    }
  }

  async login() {
    const foundUser =
      await this.httpClient.get<UserModel[]>(`${Config.USERS_API_URL}?email=${this.user.email}&password=${this.user.password}`)
        .toPromise();
    if (foundUser[0] !== undefined) {
      this.userService.setLoggedInUser(foundUser[0]);
      this.error = undefined;
      this.router.navigate(['courses']);
    } else {
      this.error = 'Incorrect email or password';
    }
  }
}
