import {FileService} from './../../services/file.service';
import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  private files: file[];
  @ViewChild('fileListTable') fileListEl: ElementRef;


  constructor(private fileService: FileService) {
    this.fileService.getFilesBelongsToAUser().subscribe(files => {
      this.files = files;
    });
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }


  onSelectionChange() {
    // this.fileService.setSelections(this.input.nativeElement.value);
    let x = this.fileListEl.nativeElement.querySelectorAll('input:checked');
    let fileIds: string[] = [];
    for (let i = 0; i < x.length; i++) {
      fileIds.push(x[i].value);
    }
    this.fileService.setSelections(fileIds);
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
