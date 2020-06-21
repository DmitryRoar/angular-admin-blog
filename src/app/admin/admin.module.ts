import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {SharedModule} from '../shared/shared.module'

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component'
import {LoginPageComponent} from './login-page/login-page.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {CreatePageComponent} from './create-page/create-page.component'

import {EditPageComponent} from './edit-page/edit-page.component'
import {AuthGuard} from './shared/services/auth.guard'
import {SearchPipe} from './shared/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component'
import {AlertService} from './shared/services/alert.service'

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [AuthGuard, AlertService],
  exports: [RouterModule]
})
export class AdminModule {
}
