import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AccountPageRoutingModule,
        WorkHeaderComponent,
    ],
    declarations: [AccountPage],
})
export class AccountPageModule {}
