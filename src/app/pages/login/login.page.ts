import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    authForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
        ]),
    });

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {}

    async handleClick() {
        if (this.authForm.valid) {
            return;
        }

        await this.authenticationService.authenticate(
            this.authForm.value.email,
            this.authForm.value.password
        );
    }

    async handleGoogle() {
        await this.authenticationService.authenticateWithGoogle();
    }
}
