import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { KeyGuard } from './key.guard';
import { LoginComponent } from './login/login/login.component';
import { PhotoUploadComponent } from './photo-album/photo-upload.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
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
        component: CalendarComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
