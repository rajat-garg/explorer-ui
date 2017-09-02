import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file.service";
import {file} from "../list-files/list-files.component";

@Component({
  selector: 'app-trashed-file',
  templateUrl: './trashed-file.component.html',
  styleUrls: ['./trashed-file.component.css']
})
export class TrashedFileComponent implements OnInit,OnDestroy {
  private trashedFiles: file[];
  @ViewChild('trashedFileListTable') fileListEl: ElementRef;


  constructor(private fileService: FileService) {
    this.fileService.getTrashedFiles().subscribe(files => {
      this.trashedFiles = files;
    })
  }

  ngOnInit() {
  }

  onSelectionChange() {
    let x = this.fileListEl.nativeElement.querySelectorAll('input:checked');
    let fileIds: string[] = [];
    for (let i = 0; i < x.length; i++) {
      fileIds.push(x[i].value);
    }
    this.fileService.setSelections(fileIds);
  }

  ngOnDestroy(){
    this.fileService.setSelections([]);
  }

}
