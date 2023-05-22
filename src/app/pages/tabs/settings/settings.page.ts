import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    constructor(private renderer: Renderer2) {}

    ngOnInit() {}

    onToggleColorTheme(event) {
        const theme = event.detail.checked ? 'dark' : 'light';
        document.body.setAttribute('color-theme', theme);
    }
}
