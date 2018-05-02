import { Component, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']

})
export class AppComponent {

    constructor(private cloudinary: Cloudinary) { }

    loggedIn() {
        return !!this.cloudinary.config().cloud_name;
    }

    logout() {
        localStorage.removeItem('config');
        window.location.href = '/';
    }

}
