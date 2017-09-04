import {DeleteComponent} from '../delete/delete.component';
import {RenameComponent} from './../rename/rename.component';
import {FileService} from './../../services/file.service';
import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagFileComponent} from "../tag-file/tag-file.component";
import {CreateFileComponent} from "../create-file/create-file.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit, OnChanges {

  @Input() selections: string[] = [];
  @Input() currentView: string = '';
  private toolbarButtons: any[];

  constructor(private fileService: FileService, private modalService: NgbModal) {
    this.toolbarButtons = this.getDefaultButtons();
  }

  private getDefaultButtons() {
    return [{
      'icon': 'fa fa-share-alt',
      'command': 'Share',
      'click': this.shareFile.bind(this)
    },
      {
        'icon': 'fa fa-download',
        'command': 'Download',
        'click': this.downloadFile.bind(this)
      },
      {
        'icon': 'fa fa-pencil-square-o',
        'command': 'Rename',
        'click': this.renameFile.bind(this)
      },
      {
        'icon': 'fa fa-folder-o',
        'command': 'Move',
        'click': this.moveFile.bind(this)
      },
      {
        'icon': 'fa fa-files-o',
        'command': 'Make a Copy',
        'click': this.duplicateFile.bind(this)
      },
      {
        'icon': 'fa fa-trash-o',
        'command': 'Delete',
        'click': this.deleteFile.bind(this)
      },
      {
        'icon': 'fa fa-tags',
        'command': 'Tags',
        'click': this.tagFile.bind(this)
      },
      {
        'icon': 'fa fa-trash',
        'command': 'Move To Trash',
        'click': this.trashFile.bind(this)
      },
    ];
  }

  ngOnChanges() {
    this.toolbarButtons = this.getDefaultButtons();

    if (this.currentView === 'trashed-file') {
      this.toolbarButtons.push({
        'icon': 'fa fa-share',
        'command': 'Restore',
        'click': this.restoreFile.bind(this)
      })
    }
  }

  ngOnInit() {

  }

  renameFile(): string {
    const modalRef = this.modalService.open(RenameComponent);
    return "Success!!!";
  }

  deleteFile(): void {
    const modelRef = this.modalService.open(DeleteComponent, {windowClass: 'dark-modal'});
  }

  tagFile(): void {
    this.modalService.open(TagFileComponent);
  }

  isDisabled(): boolean {
    return this.selections && this.selections.length <= 0;
  }

  shareFile(): string {
    return "";
  }

  downloadFile(): string {
    return "";
  }

  moveFile(): string {
    return "";
  }

  trashFile(): void {
    this.fileService.trashFile();
  }

  restoreFile(): void {
    this.fileService.trashFile();
  }

  duplicateFile(): void {
    let fileIds: string[];
    fileIds = this.fileService.getSelections();
    for (let index = 0; index < fileIds.length; index++) {
      this.fileService.duplicateFile(fileIds[index]);
    }
  }

  createFile() {
    this.fileService.folder = false;
    this.modalService.open(CreateFileComponent);
  }

  createFolder() {
    this.fileService.folder = true;
    this.modalService.open(CreateFileComponent);
  }
}
