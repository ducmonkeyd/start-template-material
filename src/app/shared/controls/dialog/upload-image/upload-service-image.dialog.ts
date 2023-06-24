import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { ClientState } from '@app/shared/services/client/client-state';
import { Configs } from '@app/shared/common/configs/configs';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FileModel } from '@app/shared/models/file/file.model';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-service-image-dialog',
  templateUrl: './upload-service-image.dialog.html'
})
export class UploadServiceImageDialog implements OnInit {
  imageModel: FileModel = new FileModel();
  attachmentModel: any = {};
  imageValidationMsg: string;

  constructor(
    public dialogRef: MatDialogRef<UploadServiceImageDialog>,
    public clientState: ClientState,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onFileChange = (event: any) => {
    let file: File = event.target.files && <File>event.target.files[0];
    if (file) {
      this.imageModel.fileName = file.name;
      this.imageModel.mediaType = file.type;

      this.imageValidationMsg = Configs.validateFile(
        file,
        [Configs.AllImageExtensions],
        Configs.FileMaximunSize,
        this.translateService
      );
      var reader = new FileReader();
      if (!this.imageValidationMsg) {
        reader.onload = (e: any) => {
          this.imageModel.data = e.target.result;
        };
      } else {
        this.imageModel.data = null;
      }

      reader.readAsDataURL(file);
      this.attachmentModel.postedFile = file;
    }
  };

  onUploadAttachment = async (form: NgForm) => {
    this.imageValidationMsg = Configs.validateFile(
      this.attachmentModel.postedFile,
      [Configs.AllImageExtensions],
      Configs.FileMaximunSize,
      this.translateService
    );

    if (!form.valid || this.imageValidationMsg) return;

    if (this.imageModel) {
      this.imageModel.file = this.attachmentModel.postedFile;
      this.dialogRef.close(this.imageModel);
    }
  };

  onCancel() {
    this.dialogRef.close(false);
  }
}
