import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    shortLink: string = "";
    loading: boolean = false;
    file!: File;

    constructor(private fileUploadService: FileUploadService, private taskService: TaskService) { }

    ngOnInit(): void {
    }
    onChange(event: any) {
        this.file = event.target.files[0];
    }

    onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {

                    this.shortLink = event.link;
                    this.taskService.sendFile(this.shortLink);

                    this.loading = false;
                }
            }

        );
    }

}
