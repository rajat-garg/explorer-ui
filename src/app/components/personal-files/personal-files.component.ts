import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-personal-files',
  templateUrl: './personal-files.component.html',
  styleUrls: ['./personal-files.component.css']
})
export class PersonalFilesComponent implements OnInit, OnDestroy {
  private files: string[] = [];
  @ViewChild('personalFileListTable') fileListEl: ElementRef;


  constructor(private fileService: FileService) {
    this.fileService.getTaggedFile('personal').subscribe(files => {
      this.files = files;
    })
  }

  ngOnInit() {
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
}
