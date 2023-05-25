import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
        private toastController: ToastController,
        private router: Router
    ) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    async handleClick() {
        if (!this.authForm.valid) {
            this.showToast(
                'Por favor, faça login fornecendo suas credenciais de acesso'
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
            this.showToast(
                'Email ou palavra-passe incorretos. Por favor, verifique suas credenciais e tente novamente.'
            );
            return;
        }

        this.router.navigate(['/tabs/home']);
    }

    async handleGoogle() {
        await this.authenticationService.authenticateWithGoogle();
    }

    async showToast(title: string) {
        const toast = await this.toastController.create({
            message: title,
            duration: 2000,
            position: 'top',
        });

        toast.present();
    }
}
