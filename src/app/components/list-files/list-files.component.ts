import {FileService} from './../../services/file.service';
import {Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit, OnDestroy {
  @Input("files") files: file[];
  @ViewChild('fileListTable') fileListEl: ElementRef;
  @Output() currentFile = new EventEmitter<string>();

  constructor(private fileService: FileService) {

  }

  ngOnInit() {
    this.files = [];
    this.fileService.getFilesBelongsToAUser().subscribe(files => {
      this.files = files;
    });
    this.fileService.fileSubject.subscribe(files => this.files = files)
  }

  onSelectionChange() {
    let x = this.fileListEl.nativeElement.querySelectorAll('input:checked');
    let fileIds: string[] = [];
    for (let i = 0; i < x.length; i++) {
      fileIds.push(x[i].value);
    }
    this.fileService.setSelections(fileIds);
  }

  ngOnDestroy() {
    this.fileService.setSelections([]);
  }

  setCurrentFile(fileId: string) {
    this.currentFile.emit(fileId);
  }

  loadFiles(fileId: string) {
    this.fileService.currentFolder = fileId;
    this.fileService.getFilesOfFolder(fileId).subscribe(files => {
      this.files = files
    });
  }
}

export interface file {
  id: number;
  name: string;
  type: string;
  size: number;
  createdOn: Date;
  modifiedOn: Date;
  parentId: number;
  fileMetadataList: metadata[];
  trashed: boolean;
  folder: boolean;
}

export interface metadata {
  id: number;
  userId: number;
  ownerId: number;
  fPermission: number;
  favourite: boolean;
  personal: boolean;
  starred: boolean;
}

//new Date("Feb 4, 2016 10:13:00");
