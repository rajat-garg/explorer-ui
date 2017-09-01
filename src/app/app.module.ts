import {FileService} from './services/file.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ListFilesComponent} from './components/list-files/list-files.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {RenameComponent} from './components/rename/rename.component';
import {DeleteComponent} from './components/delete/delete.component';
import {SharedFileComponent} from './components/shared-file/shared-file.component';
import {TrashedFileComponent} from './components/trashed-file/trashed-file.component';
import {ImpFilesComponent} from './components/imp-files/imp-files.component';
import {PersonalFilesComponent} from './components/personal-files/personal-files.component';
import {FavoriteFilesComponent} from './components/favorite-files/favorite-files.component';
import {TagFileComponent} from './components/tag-file/tag-file.component';
import {NgSwitch} from "@angular/common";
import { CreateFileComponent } from './components/create-file/create-file.component';
import { FileEditorComponent } from './components/file-editor/file-editor.component';

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
    ImpFilesComponent,
    PersonalFilesComponent,
    FavoriteFilesComponent,
    TagFileComponent,
    CreateFileComponent,
    FileEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [FileService, NgbActiveModal, NgSwitch],
  bootstrap: [AppComponent],
  entryComponents: [RenameComponent, DeleteComponent, TagFileComponent]
})
export class AppModule {
}
