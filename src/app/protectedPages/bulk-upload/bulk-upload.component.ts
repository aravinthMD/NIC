import { Component, ViewChild, ElementRef } from '@angular/core';

import { FileToBase64Service } from '@services/file-to-base64.service';
import { ToasterService } from '@services/toaster.service';
import { CsvBulkUploadService } from '@services/bulk-upload.service';

@Component({
    templateUrl: './bulk-upload.component.html',
    styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {
    csvResponse: any;
    @ViewChild('inputCsvFile', {static: false}) inputCsvFile: any;
    pageValues = [
        {
            key: '0',
            value: 'Proforma Invoice'
        },
        {
            key: '1',
            value: 'Project Execution'
        },
        {
            key: '2',
            value: 'Purchase Order'
        },
        {
            key: '3',
            value: 'Tax Invoice'
        }
    ];
    pageName = '';
    constructor(
        private fileToBase64Service: FileToBase64Service,
        private toasterService: ToasterService,
        private bulkUploadService: CsvBulkUploadService
    ) {}

    async onUpload(event) {
        const files = event.target.files[0];
        const file: any = await this.fileToBase64Service.convertToBase64(event);
        const data = {
            attachment: {
              name: file.name,
              content: file.base64,
              mime: 'application/vnd.ms-excel'
            }
        };
        this.inputCsvFile.nativeElement.value = '';

        this.bulkUploadService.uploadCsv(this.pageName, data)
            .subscribe((res: any) => {
                console.log('res', res);
                const error = res.Error;
                const errorMessage = res.ErrorMessage;
                if (error !== '0') {
                    return this.toasterService.showError(errorMessage, '');
                }

                this.getDataWithValidationMessage();

            });

        // this.uploadCsv.emit(data);
      }

      getDataWithValidationMessage() {
            this.bulkUploadService.getCsvDataWithMessage(this.pageName)
                .subscribe((res: any) => {
                    const error = res.Error;
                    const errorMessage = res.ErrorMessage;
                    if (error !== '0') {
                        return this.toasterService.showError(errorMessage, '');
                    }
                    const processVariables = res.ProcessVariables;
                    if (this.pageName === '0') {
                        this.csvResponse = {
                            screenName: 'Proforma Invoice',
                            data: processVariables.PIDataLIst
                        };
                    } else if (this.pageName === '1') {
                        this.csvResponse = {
                            screenName: 'Project Execution',
                            data: processVariables.PEDataLIst
                        };
                    } else if (this.pageName === '2') {
                        this.csvResponse = {
                            screenName: 'Purchase Order',
                            data: processVariables.PODataLIst
                        };
                    }

                    console.log('res', res);
                });
      }

      showError() {
              return this.toasterService.showError('Please select the page', '');
      }

      onModalClose(event) {
          this.csvResponse = null;
          console.log('modal close', event);
          if (!event) {
            return;
          }
          if (event.length === 0) {
           return this.toasterService.showWarning('No valid records are available to upload', '');
          }
          this.bulkUploadService.uploadValidData(this.pageName)
              .subscribe((res: any) => {
                    const error = res.Error;
                    const errorMessage = res.ErrorMessage;
                    if (error !== '0') {
                        return this.toasterService.showError(errorMessage, '');
                    }
                    const processVariables = res.processVariables;
                    // const errorObj = processVariables.error;
                    // if (errorObj.code !== '0') {
                    //     return this.toasterService.showError(errorObj.message, '');
                    // }
                    this.toasterService.showSuccess('Uploaded successfully', '');
              });
      }
}
