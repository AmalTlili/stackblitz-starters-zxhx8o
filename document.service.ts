import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentDTO } from 'app/models/DocumentDTO.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
 private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getDocument(): Observable<DocumentDTO[]>{
    return this.http.get<DocumentDTO[]>(this.apiServerUrl + "/Document/ShowDocument");
  }

  public addDocument(documents:DocumentDTO): Observable<DocumentDTO>{
    return this.http.post<DocumentDTO>(this.apiServerUrl + "/Document/AddDocument", documents);
  }
  public updateDocument(documents:DocumentDTO): Observable<DocumentDTO>{
    return this.http.put<DocumentDTO>(this.apiServerUrl + "/Document/updateDocuments", documents);
  }
  public deleteDocument(documentId: number): Observable<any>{
    return this.http.delete<any>(this.apiServerUrl  + `/Document/deleteDocument/${documentId}`);
  }
  // public uploadFile(file: File){
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post<DocumentDTO>(this.apiServerUrl + "Document/upload", formData, { responseType: 'json' });
  // }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}Document/upload`, formData, {
      reportProgress: true, // Enable progress reporting
      observe: 'events' // Observe the upload events
    });
  }

}
