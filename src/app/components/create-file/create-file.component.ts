import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public fileService: FileService) {

  }

  ngOnInit() {
  }

  createFile(fileName: string){
    this.fileService.createFile(fileName);
  }


}
