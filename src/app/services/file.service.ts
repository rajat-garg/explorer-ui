import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {
  private _selections: string[];

  constructor(private http: Http) {
    console.log('File Service Initialized...');
    this._selections = [];
  }

  getFilesBelongsToAUser() {
    return this.http.get('http://localhost:8080/rest/users/2/files').map(res => res.json());
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
  }

  deleteFile(fileId: number) {
    this.http.delete('http://localhost:8080/rest/files/');
  }

  setSelections(fileIds: string[]) {
    this._selections = fileIds;
  }

  getSelections(): string[] {
    return this._selections;
  }

  duplicateFile(fileId: string) {
    this.http.patch('http://localhost:8080/rest/files/' + fileId + '/copy', new RequestOptions({
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
    return this.http.get('http://localhost:8080/rest/users/2/sharedFiles').map(res => res.json());
  }
}
