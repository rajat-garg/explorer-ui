import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-tag-file',
  templateUrl: './tag-file.component.html',
  styleUrls: ['./tag-file.component.css']
})
export class TagFileComponent implements OnInit {
  @ViewChild('tagList') tag: ElementRef

  constructor(public activeModal: NgbActiveModal, public fileService: FileService) {
  }

  ngOnInit() {
  }

  tagFile() {
    let tag: string;
    tag = this.tag.nativeElement.querySelector('input[name=tag]:checked').value;
    this.fileService.tagFile(tag);
  }
}
