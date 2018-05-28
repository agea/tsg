'use strict';
// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// File upload module
import { FileUploadModule } from 'ng2-file-upload';
// Cloudinary module
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';

import {
    MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatExpansionModule,
    MatCardModule, MatButtonModule, MatIconModule, MatListModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatMenuModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule,
    MatRadioButton, MatRadioModule, MatRadioGroup, MatSidenavModule
} from '@angular/material';

// Application modules
import { AppComponent } from './app.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoUploadComponent } from './photo-album/photo-upload.component';
import { PhotoAlbum } from './model/photo-album.service';
import { routing } from './app.routing';

import * as cloudinary from 'cloudinary-core';
import { Cloudinary } from 'cloudinary-core';
import { LoginComponent } from './login/login/login.component';
import { KeyGuard } from './key.guard';
import { FormsModule } from '@angular/forms';
import { ReadOnlyGuard } from './read-only.guard';
import { DetailComponent } from './photo-list/detail/detail.component';

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
