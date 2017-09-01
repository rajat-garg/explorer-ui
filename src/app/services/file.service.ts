import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {file} from "../components/list-files/list-files.component";

@Injectable()
export class FileService {
  private _selections: string[];
  private userId = 2;

  constructor(private http: Http) {
    console.log('File Service Initialized...');
    this._selections = [];
  }

  getFilesBelongsToAUser() {
    let observable = this.http.get('http://localhost:8080/rest/users/2/files').map(res => res.json());
    return observable;
  }

  refreshFileList() {
    this.getFilesBelongsToAUser();
    //create a subject instance
    //push it into here
    //subscribe it in every component
  }

  renameFile(fileId: string, fileName: string) {
    let data = {"name": fileName};
    this.http.patch('http://localhost:8080/rest/files/' + fileId + '/rename', JSON.stringify(data), new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })).subscribe((m) => {
      console.log(m)
    });
    this.refreshFileList();
  }

  deleteFile() {
    let fileIds = this.getSelections();
    for (let index = 0; index < fileIds.length; index++) {
      console.log(fileIds[index]);
      this.http.delete('http://localhost:8080/rest/files/2/' + fileIds[index])
        .map(res => JSON.stringify(res))
        .subscribe();
    }
  }

  trashFile() {
    let fileIds = this.getSelections();
    for (let index = 0; index < fileIds.length; index++) {
      this.http.patch('http://localhost:8080/rest/files/' + fileIds[index] + '/trash', new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      })).subscribe((m) => {
        console.log(m);
      })
    }
  }

  setSelections(fileIds: string[]) {
    this._selections = fileIds;
  }

  getSelections(): string[] {
    return this._selections;
  }

  duplicateFile(fileId: string) {
    this.http.post('http://localhost:8080/rest/files/' + fileId + '/copy', new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })).subscribe(m => {
      console.log(m);
    });
  }

  getSharedFiles() {
    return this.http.get('http://localhost:8080/rest/users/2/sharedFiles').map(res => res.json());
  }

  getTrashedFiles() {
    return this.http.get('http://localhost:8080/rest/files/2/trash').map(res => res.json());
  }

  tagFile(tagName: string) {
    let tag = {"tag": tagName};
    let fileIds = this.getSelections();
    this.http.patch('http://localhost:8080/rest/files/' + this.userId + '/tag/' + fileIds[0], JSON.stringify(tag), new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })).subscribe((m) => {
      console.log(m)
    });
  }

  getTaggedFile(tagName: string) {
    return this.http.get('http://localhost:8080/rest/files/search/' + this.userId + '/tag/' + tagName)
      .map(res => res.json());
  }

  createFile(fileName: string) {
    let fileRecord: file = {} as file;
    fileRecord.name = fileName;
    return this.http.post('http://localhost:8080/rest/files/' + this.userId, {"name": fileName})
      .map(res => JSON.stringify(res))
      .subscribe((m) => {
        console.log(m)
      });
  }

  updateFile(content: string) {

  }
}
