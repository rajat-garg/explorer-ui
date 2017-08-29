import { FileService } from '../../services/file.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public fileService: FileService) { }

  ngOnInit() {
  }

  deleteFile(){
    //get file Id and pass it to the following method
    this.fileService.deleteFile(2);
  }

}
