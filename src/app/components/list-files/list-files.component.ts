import {FileService} from './../../services/file.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css'],
  providers: [FileService]
})
export class ListFilesComponent implements OnInit {
  private files: file[];

  constructor(private fileService: FileService) {
    this.fileService.getFilesBelongsToAUser().subscribe(files => {
      this.files = files;
    });
  }

  ngOnInit() {
  }
}

interface file {
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

interface metadata {
  id: number;
  userId: number;
  ownerId: number;
  fPermission: number;
  favourite: boolean;
  personal: boolean;
  starred: boolean;
}

//new Date("Feb 4, 2016 10:13:00");
