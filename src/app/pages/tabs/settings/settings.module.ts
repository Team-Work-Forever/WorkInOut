import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SettingsPageRoutingModule,
        WorkHeaderComponent,
    ],
    declarations: [SettingsPage],
})
export class SettingsPageModule {}
