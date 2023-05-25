import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authservice: AuthenticationService,
        private router: Router
    ) {}
    canActivate() {
        const isAuthenticated = this.authservice.isAuthenticated();

        if (!isAuthenticated) {
            return this.router.navigate(['/login']);
        }

        return this.router.navigate(['/tabs/home']);
    }
}
