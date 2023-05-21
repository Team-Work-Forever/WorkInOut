import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: 'settings',
        loadChildren: () =>
            import('./pages/tabs/settings/settings.module').then(
                (m) => m.SettingsPageModule
            ),
    },
    {
        path: 'account',
        loadChildren: () =>
            import('./pages/tabs/account/account.module').then(
                (m) => m.AccountPageModule
            ),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: 'category-plan',
        loadChildren: () =>
            import('./pages/category-plan/category-plan.module').then(
                (m) => m.CategoryPlanPageModule
            ),
    },
    {
        path: 'my-plan',
        loadChildren: () =>
            import('./pages/my-plan/my-plan.module').then(
                (m) => m.MyPlanPageModule
            ),
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
