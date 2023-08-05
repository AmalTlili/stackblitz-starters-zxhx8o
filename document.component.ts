import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from 'app/services/document.service';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentDTO } from 'app/models/DocumentDTO.model';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  isModalButtonHidden = false;


  public documents: DocumentDTO[];
  public editDocument: DocumentDTO;
  public deleteDocument: DocumentDTO;
  public documentId: number;
  public selectedDocument: DocumentDTO;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null; 
  public addForm: FormGroup;
  public editForm: FormGroup;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // public dataSource: MatTableDataSource<DocumentDTO>;
  // public displayedColumns: string[] = ['documentId', 'titre', 'dateCreation', 'taille', 'reference', 'serialNumber', 'documentValidate', 'source', 'support', 'actions'];

  // Define your pagination properties
  // public pageSizeOptions: number[] = [5, 10, 25];
  // public pageSize: number = 5;
  constructor(private documentService: DocumentService, private fb: FormBuilder) {
    this.documents=[]
     // Initialize the FormGroup using FormBuilder
     this.addForm = this.fb.group({
      titre: ['', Validators.required],
      dateCreation: ['', Validators.required],
      taille: ['', Validators.required],
      reference: ['', Validators.required],
      serialNumber: ['', Validators.required],
      documentValidate: [false],
      source: ['', Validators.required],
      support: ['', Validators.required],
      data: [''],
    });
    this.editForm = this.fb.group({
      documentId: [null], // Set initial value to null
      titre: ['', Validators.required],
      dateCreation: ['', Validators.required],
      taille: ['', Validators.required],
      reference: ['', Validators.required],
      serialNumber: ['', Validators.required],
      documentValidate: [false],
      source: ['', Validators.required],
      support: ['', Validators.required],
      data: [''],
    });
  }
  ngOnInit(): void {
    this.getDocument();
    // this.dataSource = new MatTableDataSource(this.documents);
  }

  public getDocument(): void{
    this.documentService.getDocument().subscribe(
      (response: DocumentDTO[]) =>{
        this.documents = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // onPageChange(event: PageEvent): void {
  //   const startIndex = event.pageIndex * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.documents= this.documents.slice(startIndex, endIndex);
  // }
  
  public onAddDocument(addForm: FormGroup): void{
    this.documentService.addDocument(addForm.value).subscribe(
      (response: DocumentDTO) => {
        console.log(response);
        addForm.reset();
        this.ngOnInit();
        
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
 

  
 
  onDeleteDocument(documentId: number): void {
    this.documentService.deleteDocument(documentId).subscribe(
      (response: any) => {
        console.log(response);
        this.getDocument();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  openUpdateModal(document: DocumentDTO): void {
    // Set the editForm values with the selected document data
    this.editForm.setValue({
      documentId: document.documentId,
      titre: document.titre,
      dateCreation: document.dateCreation,
      taille: document.taille,
      reference: document.reference,
      serialNumber: document.serialNumber,
      documentValidate: document.documentValidate,
      source: document.source,
      support: document.support,
      data: '', // The 'data' field won't be displayed in the form as it's used for file upload
    });

    this.onOpenModal('edit');
  }
  onEditDocument(): void {
    // Get the updated form values
    const updatedDocument: DocumentDTO = this.editForm.value;

    // Call the updateDocument service method
    this.documentService.updateDocument(updatedDocument).subscribe(
      (response: DocumentDTO) => {
        console.log('Document updated:', response);
        // Handle any logic after successful update
        // For example, close the modal and refresh the list of documents
        this.onCloseModal();
        this.getDocument();
      },
      (error: HttpErrorResponse) => {
        alert('Error updating document: ' + error.message);
      }
    );
  }
  // onEditDocument(documents: DocumentDTO): void{
  //   const formData: FormData = new FormData();

  //   document.getElementById('update-document-form')!.click();

  //   formData.append('documentId', this.editForm.get('documentId').value);
  //   formData.append('titre', this.editForm.get('titre').value);
  //   formData.append('dateCreation', this.editForm.get('dateCreation').value);
  //   formData.append('taille', this.editForm.get('taille').value);
  //   formData.append('reference', this.editForm.get('reference').value);
  //   formData.append('serialNumber', this.editForm.get('serialNumber').value);
  //   formData.append('documentValidate', this.editForm.get('documentValidate').value);
  //   formData.append('source', this.editForm.get('source').value);
  //   formData.append('support', this.editForm.get('support').value);
  //   formData.append('data', this.editForm.get('file').value); // Append the file to the formData

  //   this.documentService.updateDocument(documents).subscribe(
  //     (response: DocumentDTO) => {
  //       console.log(response);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );

  // }
  onCloseModal() {
    this.isModalButtonHidden = false;
  }

 onOpenModal(mode: string): void{
    const container=  document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      this.isModalButtonHidden = true; // Hide the modal button

      const addDocumentModal = document.getElementById('addDocumentModal');
      if (addDocumentModal) {
        addDocumentModal.classList.add('show'); // Show the modal
        addDocumentModal.style.display = 'block';
        

      }
    }
    if(mode ==='edit'){
      this.isModalButtonHidden = true; // Hide the modal button

      const updateDocumentModal = document.getElementById('updateDocumentModal');
      if (updateDocumentModal) {
        updateDocumentModal.classList.add('show'); // Show the modal
        updateDocumentModal.style.display = 'block';
      }
    }
    if(mode === 'delete'){
            this.isModalButtonHidden = true; // Hide the modal button

      const deleteDocumentModal = document.getElementById('deleteDocumentModal');
      if(deleteDocumentModal){
        deleteDocumentModal.classList.add('show');
        deleteDocumentModal.style.display = 'block';
      }
    }
    container?.appendChild(button);
    button.click();
  }
  // Function to handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  // Function to handle file upload
  onUpload(): void {
    if (!this.selectedFile) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Call the uploadFile service method in your DocumentService
    this.documentService.uploadFile(formData).subscribe(
      (response) => {
        console.log('File upload successful:', response);
        // Perform any necessary actions after successful file upload
      },
      (error) => {
        console.error('File upload error:', error);
        // Handle any error that occurred during file upload
      }
    );

    // Clear the file input after uploading (optional)
    this.fileInput.nativeElement.value = '';
  }
}
 