import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PhotoAlbum } from '../model/photo-album.service';
import { Photo, Team } from '../model/photo';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { DetailComponent } from './detail/detail.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-photo-list',
    templateUrl: 'photo-list.component.html',
    styleUrls: ['photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    public teams: Observable<Team[]>;

    public upload = false;

    constructor(
        public photoAlbum: PhotoAlbum,
        public dialog: MatDialog,
        public cloudinary: Cloudinary
    ) { }

    ngOnInit(): void {
        this.teams = this.photoAlbum.getPhotos();
        this.upload = !!this.cloudinary.config().upload_preset;
    }

    openDialog(photo: Photo): void {
        this.dialog.open(DetailComponent, {
            width: '250px',
            data:  photo
        });
    }
}
