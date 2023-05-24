import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {
    authForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
        ]),
    });

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    ngOnInit() {}

    async handleClick() {
        // if (this.authForm.valid) {
        //     return;
        // }

        await this.authenticationService.authenticate(
            this.authForm.value.email,
            this.authForm.value.password
        );

        this.router.navigate(['/tabs/home']);
    }

    async handleGoogle() {
        await this.authenticationService.authenticateWithGoogle();
    }
}
