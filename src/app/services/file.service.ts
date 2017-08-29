import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {
  private _selections: string[] = [];

  constructor(private http: Http) {
    console.log('File Service Initialized...');
  }

  getFilesBelongsToAUser() {
    return this.http.get('http://localhost:8080/rest/users/2/files').map(res => res.json());
  }

  renameFile(fileId: number, fileName: string) {
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

  setSelections(fileId: string, event: any) {
    if (event.target.checked)
      this._selections.push(fileId);
    else if (!event.target.checked) {
      this._selections = this._selections.filter(e => e !== fileId);
    }
    console.log(this._selections);
  }

  getSelections(): string[] {
    console.log(this._selections);
    return this._selections;
  }
}
