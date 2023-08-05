import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArchiveDTO } from 'app/models/ArchiveDTO.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
private  apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getArchive(): Observable<ArchiveDTO[]>{
      return this.http.get<ArchiveDTO[]>(this.apiServerUrl + "/Archive/ShowArchive");
  }
}
