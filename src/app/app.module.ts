import { FileService } from './services/file.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { routing } from './app.routing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RenameComponent } from './components/rename/rename.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SharedFileComponent } from './components/shared-file/shared-file.component';
import { TrashedFileComponent } from './components/trashed-file/trashed-file.component';

@NgModule({
  declarations: [
    AppComponent,
    ListFilesComponent,
    SidebarComponent,
    ToolbarComponent,
    RenameComponent,
    DeleteComponent,
    SharedFileComponent,
    TrashedFileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [FileService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [RenameComponent, DeleteComponent]
})
export class AppModule { }
