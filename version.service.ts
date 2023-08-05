import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VersionDTO } from 'app/models/VersionDTO.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getVersion(): Observable<VersionDTO[]>{
          return this.http.get<VersionDTO[]>(this.apiServerUrl +"/Version/showVersion");
  }
}
