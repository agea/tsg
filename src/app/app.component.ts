import { Component } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']

})
export class AppComponent {

    loggedIn = false;
    admin = false;
    gsheet = '';

    constructor(private cloudinary: Cloudinary) {
        this.loggedIn = !!this.cloudinary.config().cloud_name;
        this.admin = !!this.cloudinary.config().upload_preset;
        try {
            this.gsheet = JSON.parse(localStorage.getItem('config')).google_sheet;
        } catch (err) { }
    }

    logout() {
        localStorage.removeItem('config');
        window.location.href = '/';
    }

}
