import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() viewChanged = new EventEmitter<string>();

  constructor(private fileService: FileService) {
  }

  setCurrentView(view: string) {
    this.viewChanged.emit(view)
  }

  ngOnInit() {
  }

}
