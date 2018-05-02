import { Component, OnInit } from '@angular/core';
import * as sjcl from 'sjcl';
import { MatSnackBar } from '@angular/material';


// tslint:disable-next-line:max-line-length
const read = '{"iv":"EzN9R0OJmMSKzs/pn+mPgA==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"uZ311/Fa1xw=","ct":"+2ftLtRgMeEHeXISc22aBDK4cpW/SnoOGSDsAmNHVyh/"}';
// tslint:disable-next-line:max-line-length
const write = '{"iv":"kDo0DAvs5dl29T8pxalk5g==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"yo+GANZTOD4=","ct":"fkLH9MHN1c9ZLyaro/RR/unX0e0zVmmoLzJgiVzPE7hz1k+GlCfjtZo2cARfO2S7nEs6HRGRpsDUvB3CXZR8"}';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public key: string;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public login() {
    try {
      let config: any;
      try {
        config = JSON.parse(sjcl.decrypt(this.key, read));
      } catch (err) {
        config = JSON.parse(sjcl.decrypt(this.key, write));
      }
      localStorage.setItem('config', JSON.stringify(config));
      window.location.href = '/';
    } catch (err) {
      console.log(err);
      this.snackBar.open('Password non valida', null, { duration: 3000 });
    }

  }

}
