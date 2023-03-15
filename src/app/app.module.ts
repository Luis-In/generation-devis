import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { GroupComponent } from './components/group/group.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { ElementComponent } from './components/element/element.component';
import { MenuComponent } from './components/menu/menu.component';
import { SubGroupComponent } from './components/sub-group/sub-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    GroupComponent,
    AddGroupComponent,
    ElementComponent,
    MenuComponent,
    SubGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
