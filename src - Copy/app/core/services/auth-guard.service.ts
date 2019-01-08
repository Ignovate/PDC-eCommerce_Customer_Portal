import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CONFIG } from '../../config';
import { LocalStore } from '../../store/local-store';
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url; 
        console.log('url',url)
        CONFIG._active_url = url;
        if (LocalStore.get('loggedIn')) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // let loggedInUser = this.authService.getLoggedInUser();
        if (LocalStore.get('loggedIn').role === 'ADMIN') {
            return true;
        } else {
            return false;
        }
    }
} 