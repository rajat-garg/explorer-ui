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

  refreshFileList() {
    this.getFilesBelongsToAUser();
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
    return this.http.get('http://localhost:8080/rest/users/2/sharedFiles').map(res => res.json());
  }
}
