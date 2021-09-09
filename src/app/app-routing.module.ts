import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { TokenAccessComponent } from './common/token-access/token-access.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
      path: 'token/:token',
      children: [
        {
          path: '**',
          component: TokenAccessComponent,
        }
      ],
    },

    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'create-account',
          component: RegisterComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        }
      ]
    },

    {
      path: 'admin',
      component: LayoutComponent,
      children: [
        {
          path: 'panel',
          component: AdminPanelComponent
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  }
