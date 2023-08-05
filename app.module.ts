import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from "@angular/platform-browser";
import { DocumentComponent } from "./process_area/document/document.component";
import { ArchiveComponent } from "./process_area/archive/archive.component";
import { VersionComponent } from "./process_area/version/version.component";
import { ProcessusComponent } from './process_area/processus/processus.component';
import { NgbCollapseModule, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DocumentComponent,
    DocumentComponent,
    ArchiveComponent,
    VersionComponent,
    ProcessusComponent,
   
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule, FormsModule,
    NgbModule, 
    NgbModalModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
