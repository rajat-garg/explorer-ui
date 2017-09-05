import {Component, OnInit} from '@angular/core';
import {FileService} from "./services/file.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  files: any[] = [];
  currentFile: any;
  currentView: string = '';

  constructor(private fileService: FileService) {

  }

  setCurrentView(view: string) {
    this.currentView = view;
    // this.fileService.setSelections(null);
  }

  setCurrentFile(currentFileId: string) {
    // for (let file of this.files) {
    //   if (file.id == currentFileId) {
    //     this.currentFile = file;
    //     console.log(file);
    //   }
    // }
    console.log(currentFileId);
    this.fileService.getFileById(currentFileId).subscribe(m => this.currentFile = m);
    this.currentView = 'file-editor';
  }

  ngOnInit() {
    //Load files in the starting of the application.
    this.fileService.trashFile();
    this.fileService.getFilesBelongsToAUser().subscribe(files => this.files = files);
  }
}
