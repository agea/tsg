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
import encryptedConfig from './config';
import { routing } from './app.routing';

import * as sjcl from 'sjcl';
import * as cloudinary from 'cloudinary-core';
import { Cloudinary } from 'cloudinary-core';
import { LoginComponent } from './login/login/login.component';
import { KeyGuard } from './key.guard';
import { FormsModule } from '@angular/forms';
import { ReadOnlyGuard } from './read-only.guard';

export const cloudinaryLib = {
    Cloudinary: Cloudinary
};

let config = { cloud_name: null, upload_preset: null };
try {
    let key = localStorage.getItem('key');
    if (!key) {
        key = decodeURIComponent(window.location.search).match(/key=\[(\w+)\]/)[1];
        localStorage.setItem('key', key);
    }
    try {
        config = JSON.parse(sjcl.decrypt(key, JSON.stringify(encryptedConfig.read)));
    } catch (err) {
        config = JSON.parse(sjcl.decrypt(key, JSON.stringify(encryptedConfig.write)));
    }
} catch (err) {
    localStorage.removeItem('key');
}

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
    declarations: [
        AppComponent,
        PhotoListComponent,
        PhotoUploadComponent,
        LoginComponent
    ],
    providers: [
        KeyGuard,
        ReadOnlyGuard,
        PhotoAlbum
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
