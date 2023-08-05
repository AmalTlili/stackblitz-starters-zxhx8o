import { ArchiveDTO } from "./ArchiveDTO.model";
import { UserDTO } from "./UserDTO.model";
import{VersionDTO} from "./VersionDTO.model";

export class DocumentDTO {
    documentId:  number;
     titre: String;
     dateCreation: Date;
     taille: String;
     reference: String;
     serialNumber:  number;
     documentValidate: Boolean;
     source: String;
     support: String;
     data: Blob;
    
     typeDocumentId:  number;
     processId:  number;
     version: Set<VersionDTO>;
     users: Set<UserDTO>;
     archives: Set<ArchiveDTO>;
}