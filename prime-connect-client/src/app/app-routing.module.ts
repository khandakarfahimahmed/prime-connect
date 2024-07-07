import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TeamRolesComponent } from './components/team-roles/team-roles.component';
import { canActivate } from './routeGuard/auth.guard';
import { Workflow1Component } from './components/workflow1/workflow1.component';
import { Workflow2Component } from './components/workflow2/workflow2.component';
import { PeopleComponent } from './components/people/people.component';
import { DepartmentComponent } from './components/department/department.component';
import { TeamsComponent } from './components/teams/teams.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReviewerComponent } from './components/reviewer/reviewer.component';
import { RoleEmployeeComponent } from './components/role-employee/role-employee.component';
import { WriteComponent } from './components/employee/write/write.component';
import { ReadWriteComponent } from './components/employee/read-write/read-write.component';
import { TeamAdminDashboardComponent } from './components/team-admin-dashboard/team-admin-dashboard.component';
import { DeptAdminDashboardComponent } from './components/dept-admin-dashboard/dept-admin-dashboard.component';
import { ManualRouteGuard } from './routeGuard/manual-route.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'workflow1',
    component: Workflow1Component,
    canActivate: [canActivate],
  },
  {
    path: 'write/:employee_id/:order_id',
    component: WriteComponent,
    canActivate: [canActivate],
  },
  {
    path: 'read-write/:employee_id/:order_id',
    component: ReadWriteComponent,
    canActivate: [canActivate],
  },
  {
    path: 'reviewer/:acc_id/:team_id/:customer_id/:employee_id',
    component: ReviewerComponent,
    canActivate: [canActivate],
  },
  {
    path: 'workflow2/:id',
    component: Workflow2Component,
    canActivate: [canActivate],
  },
  {
    path: 'teamroles',
    component: TeamRolesComponent,
    canActivate: [canActivate],
  },
  {
    path: 'app-teams/:id',
    component: TeamsComponent,
    canActivate: [canActivate],
  },
  {
    path: 'create-form',
    component: CreateFormComponent,
    canActivate: [canActivate],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [canActivate],
  },
  { path: 'sidebar', component: SidebarComponent, canActivate: [canActivate] },
  {
    path: 'people/:id',
    component: PeopleComponent,
    canActivate: [canActivate],
  },
  {
    path: 'employee/:id',
    component: RoleEmployeeComponent,
    canActivate: [canActivate],
  },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [canActivate],
  },
  {
    path: 'employee-dashboard/:id/:role',
    component: EmployeeDashboardComponent,
    canActivate: [canActivate],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [canActivate],
  },
  {
    path: 'team-admin-dashboard',
    component: TeamAdminDashboardComponent,
    canActivate: [canActivate],
  },
  {
    path: 'dept-admin-dashboard',
    component: DeptAdminDashboardComponent,
    canActivate: [canActivate],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
