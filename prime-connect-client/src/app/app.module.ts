import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Remove this line
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  provideHttpClient,
} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TeamRolesComponent } from './components/team-roles/team-roles.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LoaderComponent } from './components/loader/loader.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TeamsComponent } from './components/teams/teams.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { Workflow1Component } from './components/workflow1/workflow1.component';
import { Workflow2Component } from './components/workflow2/workflow2.component';
import { PeopleComponent } from './components/people/people.component';
import { DepartmentComponent } from './components/department/department.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { WriteComponent } from './components/employee/write/write.component';
import { WriteFormComponent } from './components/employee/write-form/write-form.component';
import { ReadWriteComponent } from './components/employee/read-write/read-write.component';
import { ReadWriteFormComponent } from './components/employee/read-write-form/read-write-form.component';
import { ImageLoaderComponent } from './components/employee/image-loader/image-loader.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ReviewerComponent } from './components/reviewer/reviewer.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { RoleEmployeeComponent } from './components/role-employee/role-employee.component';
import { TeamAdminDashboardComponent } from './components/team-admin-dashboard/team-admin-dashboard.component';
import { ScatterChartComponent } from './components/scatter-chart/scatter-chart.component';
import { MixedChartComponent } from './components/mixed-chart/mixed-chart.component';
import { GradientCircleChartComponent } from './components/gradient-circle-chart/gradient-circle-chart.component';
import { StackedAreaChartComponent } from './components/stacked-area-chart/stacked-area-chart.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DeptAdminDashboardComponent } from './components/dept-admin-dashboard/dept-admin-dashboard.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { UpdateWorkflowFormComponent } from './components/update-workflow-form/update-workflow-form.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { AccountListComponent } from './components/account-list/account-list.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TeamRolesComponent,
    SidebarComponent,
    LoaderComponent,
    TeamsComponent,
    RolesComponent,
    AddTeamComponent,
    Workflow1Component,
    Workflow2Component,
    PeopleComponent,
    DepartmentComponent,
    AddRoleComponent,
    AddDepartmentComponent,
    AddEmployeeComponent,
    AddFormComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    CreateFormComponent,
    WriteComponent,
    WriteFormComponent,
    ReadWriteComponent,
    ReadWriteFormComponent,
    ImageLoaderComponent,
    ReviewerComponent,
    PdfViewerComponent,
    RoleEmployeeComponent,
    UpdateEmployeeComponent,
    ExamplePdfViewerComponent, // Remove this line
    TeamAdminDashboardComponent,
    GradientCircleChartComponent,
    StackedAreaChartComponent,
    ScatterChartComponent,
    MixedChartComponent,
    DeptAdminDashboardComponent,
    UpdateWorkflowFormComponent,
    PieChartComponent,
    StackedBarChartComponent,
    ImageContainerComponent,
    AccountListComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Remove this line
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzMenuModule,
    NzMessageModule,
    NzButtonModule,
    NzSkeletonModule,
    NgApexchartsModule,
    NzModalModule,
    NzDrawerModule,
    NzRadioModule,
    NzInputModule,
    NzSelectModule,
    NzImageModule,
    NgMultiSelectDropDownModule,
    NzSpinModule,
    NzAlertModule,
    NgxImageZoomModule,
    NgxExtendedPdfViewerModule,
    NzCardModule,
    NzImageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
