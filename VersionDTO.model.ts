import { ArchiveDTO } from "./ArchiveDTO.model";

export class VersionDTO{
    versionId: number;
    numeroVersion: number;
    description: String;
    ancienVersion: number;
    path: String;
    documentId: number;
    archiveDTO: ArchiveDTO;
}