import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoUploadComponent } from './photo-album/photo-upload.component';
import { KeyGuard } from './key.guard';
import { LoginComponent } from './login/login/login.component';
import { ReadOnlyGuard } from './read-only.guard';

const appRoutes: Routes = [
    {
        path: 'photos',
        component: PhotoListComponent,
        canActivate: [ReadOnlyGuard]
    },
    {
        path: 'photos/new',
        component: PhotoUploadComponent,
        canActivate: [KeyGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/photos',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
