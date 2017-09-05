import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FileService} from "../../services/file.service";
import {file} from "../list-files/list-files.component";

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (!this.currentFile) return;
    this.fileService.readFile(this.currentFile.id).subscribe(content => {
      console.log(content);
      this.currentContent = content;
    });
  }

  @Input() currentFile: any;
  currentContent: string;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    console.log(this.currentFile);
    if (!this.currentFile) return;
  }

  updateContent(fileRecord: file, content: string) {
    console.log("File id: " + fileRecord.id);
    alert("Your file is updated successfully!!!");
    this.fileService.updateFile(fileRecord, content);
  }

}
