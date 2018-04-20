import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PhotoAlbum} from '../model/photo-album.service';
import {Photo, Team} from '../model/photo';

@Component({
    selector: 'app-photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    public teams: Observable<Team[]>;

    constructor(
        public photoAlbum: PhotoAlbum
    ) { }

    ngOnInit(): void {
        this.teams = this.photoAlbum.getPhotos();
    }
}
