import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { Routes,RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
    {
        path: '',
        component: ListFilesComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
