import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Photo, Team } from './photo';

@Injectable()
export class PhotoAlbum {

    constructor(private http: HttpClient,
        private cloudinary: Cloudinary,
        private sanitizer: DomSanitizer) {
    }

    getPhotos(): Observable<Team[]> {
        const url = this.cloudinary.url('teams-' + new Date().getFullYear(), {
            format: 'json',
            type: 'list',
            // cache bust (lists are cached by the CDN for 1 minute)
            // *************************************************************************
            // Note that this is practice is DISCOURAGED in production code and is here
            // for demonstration purposes only
            // *************************************************************************
            version: this.cloudinary.config().upload_preset ? Math.ceil(new Date().getTime() / 1000) : undefined
        });

        const re = /_/g;

        return this.http
            .get(url)
            .pipe(map((data: any) => {
                const teams: Team[] = [];
                const photos = data.resources as Photo[];
                photos.forEach(photo => {
                    const strings = photo.public_id.substring(5).split('-');
                    const teamName = strings[0].replace(re, ' ');
                    photo.surname = strings[1].replace(re, ' ');
                    photo.name = strings[2].replace(re, ' ');
                    // tslint:disable-next-line:max-line-length
                    photo.url = this.sanitizer.bypassSecurityTrustStyle(`url('https://res.cloudinary.com/${this.cloudinary.config().cloud_name}/image/upload/c_fill_pad,g_auto:face,h_256,q_75,w_256/v1/${photo.public_id}.jpg')`);
                    // tslint:disable-next-line:max-line-length
                    photo.fullUrl = this.sanitizer.bypassSecurityTrustUrl(`https://res.cloudinary.com/${this.cloudinary.config().cloud_name}/image/upload/c_fit,h_640,q_75,w_640/v1/${photo.public_id}.jpg`);
                    let team = teams.find(t => t.name === teamName);
                    if (!team) {
                        team = new Team(teamName);
                        teams.push(team);
                    }
                    team.photos.push(photo);
                });
                teams.sort((a, b) => a.name.trim().localeCompare(b.name.trim()));
                teams.forEach(team => team.photos.sort((a, b) => a.surname.trim().localeCompare(b.surname.trim())));
                return teams;
            }));
    }
}
