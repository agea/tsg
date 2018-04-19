import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class KeyGuard implements CanActivate {

  constructor(private cloudinary: Cloudinary, private router: Router, private snackBar: MatSnackBar) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const c = this.cloudinary.config();
    if (!c.cloud_name) {
      this.router.navigate(['/login']);
      this.snackBar.open('Chiave non valida');
      return false;
    }
    return true;
  }
}
