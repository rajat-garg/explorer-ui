import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";
import {file} from "../list-files/list-files.component";

@Component({
  selector: 'app-shared-file',
  templateUrl: './shared-file.component.html',
  styleUrls: ['./shared-file.component.css']
})
export class SharedFileComponent implements OnInit {
  private sharedFiles: file[];

  constructor(private fileService: FileService) {
    this.fileService.getSharedFiles().subscribe(sharedFiles => {
      this.sharedFiles = sharedFiles;
    });
  }

  ngOnInit() {
  }

}
