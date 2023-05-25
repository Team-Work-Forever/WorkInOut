import { Component, OnInit } from '@angular/core';
import { AppStorageService } from './services/app-storage.service';
import { ViewWillEnter } from '@ionic/angular';
import { getTheme } from 'src/utils/theme.utils';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {}
