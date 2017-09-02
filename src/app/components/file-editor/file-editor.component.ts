import {Component, Input, OnInit} from '@angular/core';
import {FileService} from "../../services/file.service";
import {file} from "../list-files/list-files.component";

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit {
  @Input() currentFile: any;
  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  updateContent(fileRecord: file, content: string) {
    console.log("File id: " + fileRecord.id);
    this.fileService.updateFile(fileRecord,content);
  }

}
