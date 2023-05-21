import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('../pages/tabs/home/home.module').then(
                        (m) => m.HomePageModule
                    ),
            },
            {
                path: 'statistics',
                loadChildren: () =>
                    import('../pages/tabs/statistics/statistics.module').then(
                        (m) => m.StatisticsPageModule
                    ),
            },
            {
                path: 'schedule',
                loadChildren: () =>
                    import('../pages/tabs/schedule/schedule.module').then(
                        (m) => m.SchedulePageModule
                    ),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('../pages/tabs/settings/settings.module').then(
                        (m) => m.SettingsPageModule
                    ),
            },
            {
                path: 'account',
                loadChildren: () =>
                    import('../pages/tabs/account/account.module').then(
                        (m) => m.AccountPageModule
                    ),
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
