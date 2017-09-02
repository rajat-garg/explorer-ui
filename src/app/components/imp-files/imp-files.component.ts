import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-imp-files',
  templateUrl: './imp-files.component.html',
  styleUrls: ['./imp-files.component.css']
})
export class ImpFilesComponent implements OnInit,OnDestroy {
  private files: string[] = [];
  @ViewChild('impFileTableList') fileListEl: ElementRef;


  constructor(private fileService: FileService) {
    this.fileService.getTaggedFile('star').subscribe(files => {
      this.files = files;
    })
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

  ngOnInit() {
  }

}
