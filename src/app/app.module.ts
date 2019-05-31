'use strict';
// Angular modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, //
    MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, //
    MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, //
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, //
    MatSelectModule, MatSidenavModule, MatSnackBarModule, MatSortModule, // 
    MatTableModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Cloudinary module
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
// File upload module
import { FileUploadModule } from 'ng2-file-upload';
// Application modules
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CalendarComponent } from './calendar/calendar.component';
import { KeyGuard } from './key.guard';
import { LoginComponent } from './login/login/login.component';
import { PhotoAlbum } from './model/photo-album.service';
import { PhotoUploadComponent } from './photo-album/photo-upload.component';
import { DetailComponent } from './photo-list/detail/detail.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { ReadOnlyGuard } from './read-only.guard';






export const cloudinaryLib = {
    Cloudinary: Cloudinary
};

export let config: any = null;
try {
    config = JSON.parse(localStorage.getItem('config'));
} catch (err) {
    console.log(err);
}

console.log('APP MODULE CONFIG:');
console.log(config);
@NgModule({
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CloudinaryModule.forRoot(cloudinaryLib, config),
        FileUploadModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatSelectModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatRadioModule,
        routing
    ],
    entryComponents: [DetailComponent],
    declarations: [
        AppComponent,
        PhotoListComponent,
        CalendarComponent,
        PhotoUploadComponent,
        LoginComponent,
        DetailComponent
    ],
    providers: [
        KeyGuard,
        ReadOnlyGuard,
        PhotoAlbum
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
