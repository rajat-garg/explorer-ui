import {Headers, Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {file} from "../components/list-files/list-files.component";
import {Subject} from "rxjs/Subject";
import {swalDefaultsProvider} from "@toverux/ngsweetalert2/dist/types+es2015-modules/src/di";

@Injectable()
export class FileService {
  private _selections: string[];
  private userId = 2;
  public folder = false;
  public fileSubject = new Subject<any>();
  public currentFolder: string = '000';


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
    this.http.delete('http://localhost:8080/rest/files/2/' + fileIds)
      .map(res => JSON.stringify(res))
      .subscribe(m => {
        console.log(m);
        this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m))
      });
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
        this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
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
      this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
    });
  }

  getSharedFiles() {
    return this.http.get('http://localhost:8080/rest/users/2/sharedFiles')
      .map(res => res.json());
  }

  getTrashedFiles() {
    return this.http.get('http://localhost:8080/rest/files/2/trash')
      .map(res => res.json())
      .map(files => {
        this.fileSubject.next(files);
        return files;
      });
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
      console.log(m);
      this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
    });
  }

  shareFile(permission: string) {
    let ownerId = 2;
    let userId = 1;
    let fileIds = this.getSelections();
    for (let index = 0; index < fileIds.length; index++) {
      this.http.patch('http://localhost:8080/rest/permissions/' + ownerId + '/' + fileIds[index] + '/' + userId + '/' + permission, JSON.stringify(""))
        .map(res => res.text())
        .subscribe(m => {
          console.log(m);
        });
    }
  }

  getTaggedFile(tagName: string) {
    return this.http.get('http://localhost:8080/rest/files/search/' + this.userId + '/tag/' + tagName)
      .map(res => res.json());
  }

  getFilesOfFolder(fileId: string) {
    return this.http.get('http://localhost:8080/rest/files/folder/' + fileId)
      .map(res => res.json())
  }

  createFile(fileName: string) {
    let fileRecord: file = {} as file;
    fileRecord.name = fileName;
    return this.http.post('http://localhost:8080/rest/files/' + this.userId, {
      "name": fileName,
      "folder": this.folder,
      "parentId": this.currentFolder
    })
      .map(res => JSON.stringify(res))
      .subscribe((m) => {
        console.log(m);
        this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
      });
  }

  updateFile(file: file, content: string) {
    let fileContent = {"content": content};
    return this.http.patch('http://localhost:8080/rest/files/' + file.id, JSON.stringify(fileContent))
      .map(res => res.text())
      .subscribe((m) => {
        console.log(m);
      });
  }

  uploadFile(formData: FormData) {
    formData.append("parentId", (this.currentFolder));
    return this.http.post('http://localhost:8080/rest/upload', formData)
      .map(res => JSON.stringify(res))
      .subscribe((m) => {
        alert("File Uploaded Successfully!!!");
        this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
      })
  }

  pasteFile() {
    let destination = this.currentFolder;
    //files To Move
    let fileIds = this.getSelections();
    console.log("Destination: ", destination, "Resource", fileIds.length);

    for (let index = 0; index < fileIds.length; index++) {
      this.http.patch('http://localhost:8080/rest/files/' + fileIds[index] + '/move', {
        "destination": destination
      })
        .map(res => JSON.stringify(res))
        .subscribe(m => console.log(m));
      this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
    }
  }

  downloadFile(fileId: string) {
    let downloadFile = 'http://localhost:8080/rest/download/' + fileId;
    window.open(downloadFile, '_blank', "windowName");
    this.getFilesBelongsToAUser().subscribe(m => this.fileSubject.next(m));
  }

  readFile(fileId: string) {
    let url = 'http://localhost:8080/rest/download/' + fileId;
    return this.http.get(url).map(res => res.text());
  }

  getFileById(fileId: string) {
    return this.http.get('http://localhost:8080/rest/files/' + fileId)
      .map(res => res.json());
  }


}
