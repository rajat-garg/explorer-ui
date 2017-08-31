import {Component, OnInit} from '@angular/core';
import {FileService} from "./services/file.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  files: any[]=[];
  constructor(private fileService: FileService) {

  }

  ngOnInit(){
    this.fileService.getFilesBelongsToAUser().subscribe(files => {
      this.files = files;
    });
  }
}
