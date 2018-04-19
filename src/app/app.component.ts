import { Component, OnInit } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']

})
export class AppComponent implements OnInit {

    constructor(private cloudinary: Cloudinary) {

    }
    ngOnInit() {

    }

}
