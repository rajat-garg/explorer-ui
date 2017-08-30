import {DeleteComponent} from '../delete/delete.component';
import {RenameComponent} from './../rename/rename.component';
import {FileService} from './../../services/file.service';
import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DuplicateComponent} from "../duplicate/duplicate.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @Input() selections: string[] = [];
  private toolbarButtons: any[];

  constructor(private fileService: FileService, private modalService: NgbModal) {
    this.toolbarButtons = [{
      'icon': 'fa fa-share-alt',
      'command': 'Share',
      'click': this.shareFile
    },
      {
        'icon': 'fa fa-download',
        'command': 'Download',
        'click': this.downloadFile
      },
      {
        'icon': 'fa fa-pencil-square-o',
        'command': 'Rename',
        'click': this.renameFile.bind(this)
      },
      {
        'icon': 'fa fa-folder-o',
        'command': 'Move',
        'click': this.moveFile
      },
      {
        'icon': 'fa fa-files-o',
        'command': 'Make a Copy',
        'click': this.duplicateFile
      },
      {
        'icon': 'fa fa-trash-o',
        'command': 'Trash',
        'click': this.deleteFile
      }
    ]
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

  isDisabled(): boolean {
    return this.selections.length <= 0;
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

  duplicateFile(): void {
    // this.modalService.open(DuplicateComponent);
    this.fileService.duplicateFile("1");
  }
}
