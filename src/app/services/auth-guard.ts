import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap((state) => {
        if (!state) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap((state) => {
        if (!state) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
