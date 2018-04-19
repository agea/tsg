import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Photo} from './photo';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Injectable()
export class PhotoAlbum {

    constructor(private http: HttpClient, private cloudinary: Cloudinary) {
    }

    getPhotos(): Observable<Photo[]> {
        const url = this.cloudinary.url('teams-' + new Date().getFullYear(), {
            format: 'json',
            type: 'list',
            // cache bust (lists are cached by the CDN for 1 minute)
            // *************************************************************************
            // Note that this is practice is DISCOURAGED in production code and is here
            // for demonstration purposes only
            // *************************************************************************
            version: Math.ceil(new Date().getTime() / 1000)
        });

        return this.http
            .get(url)
            .pipe(map((data: any) => data.resources));
    }
}
