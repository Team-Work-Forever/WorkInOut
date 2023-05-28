import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private _authService: AuthenticationService,
        private _router: Router
    ) {}

    async canActivate(): Promise<boolean> {
        if (await this._authService.isAuthenticated()) {
            return true;
        }

        this._router.navigate(['/login'], {
            skipLocationChange: true,
            replaceUrl: true,
        });

        return false;
    }
}
