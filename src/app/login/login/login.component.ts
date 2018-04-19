import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public key: string;

  constructor() { }

  ngOnInit() {
  }

  public login() {
    localStorage.setItem('key', this.key);
    window.location.href = '/';
  }

}
