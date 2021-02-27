import { Component, Inject, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-csv-upload-modal',
    templateUrl: './csv-upload-modal.component.html',
    styleUrls: ['./csv-upload-modal.component.scss']
})
export class CsvUploadModalComponent implements OnInit, OnChanges {

@Input() data;
@Output() closeModal = new EventEmitter();


dataSource: any;

dataPerPage = 10;

tableData = [];


constructor(
) {

}

PI_DISPLAY_COLUMNS = [
'Amount',
'ClientId',
'Date',
'EndDate',
'NICSIManager',
'Owner',
'PIStatus',
'PaymentStatus',
'ProformaInvoiceNumber',
'ReferenceNumber',
'Remark',
'StartDate',
// 'StatusCode',
'StatusMessage',
'Traffic' ];
displayedColumns: string[] = [
        'UserID',
        'projectNo',
        'Department',
        'State',
        'Status',
      ];

ngOnInit() {

}

ngOnChanges() {
    if (this.data) {
        const screenName = this.data.screenName;
        if (screenName === 'PI') {
            this.displayedColumns = this.PI_DISPLAY_COLUMNS;
        }
        this.dataSource = this.data.data || [];
        this.tableData = [...this.dataSource].splice(0, this.dataPerPage);
     }
}

onCancel() {
      this.closeModal.emit();
}

onSave() {
   if (!this.dataSource || this.dataSource.length === 0) {
       return this.closeModal.emit();
   }
   const filterData = this.dataSource.filter((value) => {
        return value.StatusCode === '0';
   }) || [];
//    if (filterData.length === 0) {
//        return this.closeModal.emit();
//    }
   this.closeModal.emit(filterData);
}

onPageChange(event) {
    const currentPage = event.pageIndex;
    const start = currentPage === 0 ? 0 : this.dataPerPage * currentPage;
    const end = currentPage === 0 ? this.dataPerPage : this.dataPerPage * (currentPage + 1);
    this.tableData = [...this.dataSource].splice(start, end);
    // console.log(event);
}

}
