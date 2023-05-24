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
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/tabs/home/home.module').then(
                                (m) => m.HomePageModule
                            ),
                    },
                    {
                        path: 'mine',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import(
                                        '../pages/my-plan/my-plan.module'
                                    ).then((m) => m.MyPlanPageModule),
                            },
                            {
                                path: 'create',
                                loadChildren: () =>
                                    import(
                                        '../pages/create-plan/create-plan.module'
                                    ).then((m) => m.CreatePlanPageModule),
                            },
                            {
                                path: 'add',
                                loadChildren: () =>
                                    import(
                                        '../pages/add-plan/add-plan.module'
                                    ).then((m) => m.AddPlanPageModule),
                            },
                        ],
                    },
                    {
                        path: 'category',
                        loadChildren: () =>
                            import(
                                '../pages/category-plan/category-plan.module'
                            ).then((m) => m.CategoryPlanPageModule),
                    },
                ],
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
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/tabs/account/account.module').then(
                                (m) => m.AccountPageModule
                            ),
                    },
                    {
                        path: 'hints',
                        children: [
                            {
                                path: '',
                                loadChildren: () =>
                                    import('../pages/hints/hints.module').then(
                                        (m) => m.HintsPageModule
                                    ),
                            },
                        ],
                    },
                ],
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
