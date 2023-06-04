import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageManagerService } from 'src/app/services/message-manager.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewWillEnter {
    public isLoading: boolean = false;

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
        private toastService: ToastService,
        private messageManager: MessageManagerService,
        private router: Router
    ) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        this.authForm.reset();
    }

    /**
     * Log in
     * @returns
     */
    async handleClick() {
        if (!this.authForm.valid) {
            this.toastService.showToast(
                this.messageManager.getMessages().login.failNotification
                    .ApplyCredentials
            );
            return;
        }
        this.isLoading = true;

        const result = await this.authenticationService.authenticate(
            this.authForm.value.email,
            this.authForm.value.password
        );
        this.isLoading = false;

        if (result) {
            this.toastService.showToast(
                this.messageManager.getMessages().login.failNotification
                    .IncorrentCrentials
            );
            return;
        }

        this.router.navigate(['/tabs/home'], {
            skipLocationChange: true,
            replaceUrl: true,
        });
    }

    async handleGoogle() {
        await this.authenticationService.authenticateWithGoogle();
    }
}
