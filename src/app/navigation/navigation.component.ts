import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../authentication/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.userService.getLoggedInUser();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
