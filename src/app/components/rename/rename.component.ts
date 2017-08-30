import {ListFilesComponent} from './../list-files/list-files.component';
import {FileService} from '../../services/file.service';
import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css']
})
export class RenameComponent implements OnInit {
  @Input() name: string;
  @Input() fileId: string[];


  constructor(public activeModal: NgbActiveModal, public fileService: FileService) {
  }

  ngOnInit() {
  }

  renameFile(name: string): string {
    this.fileId = this.fileService.getSelections();
    this.fileService.renameFile(this.fileId[0], name);
    return "Renamed Successfully";
  }
}
