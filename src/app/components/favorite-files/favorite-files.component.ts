import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-favorite-files',
  templateUrl: './favorite-files.component.html',
  styleUrls: ['./favorite-files.component.css']
})
export class FavoriteFilesComponent implements OnInit,OnDestroy {
  private files: string[] = [];
  @ViewChild('favFileListTable') fileListEl: ElementRef;


  constructor(private fileService: FileService) {
    this.fileService.getTaggedFile('favourite').subscribe(files => {
      this.files = files;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.fileService.setSelections([]);
  }

  onSelectionChange() {
    let x = this.fileListEl.nativeElement.querySelectorAll('input:checked');
    let fileIds: string[] = [];
    for (let i = 0; i < x.length; i++) {
      fileIds.push(x[i].value);
    }
    this.fileService.setSelections(fileIds);
  }

}
