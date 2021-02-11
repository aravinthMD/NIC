import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from '../../services/util.service';
import { SearchService } from '../../services/search.service';
import { ApiService } from '../../services/api.service';
import { ToasterService } from '@services/toaster.service';
import { ClientDetailsService } from '@services/client-details.service';
import { DashboardService } from '@services/dashboard.service';

import { CsvDataService } from '@services/csv-data.service';
import { NewAccountService } from '@services/new-account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  purchaseOrderPendingCount: string;
  proformaInvoicePendingCount: string;
  invoicePendingCount: string;
  partialBillPaidCount: string;

  displayedColumns: string[] = [
    'UserID',
    'projectNo',
    'Department',
    'State',
    'Status',
  ];

  userList: any[] = [];

  dataSource = new MatTableDataSource<any>(this.userList);
  sortedData = [];
  isSearchApiCalled: boolean;
  csvData: any;

  constructor(
    private route: Router,
    private utilService: UtilService,
    private searchService: SearchService,
    private apiService: ApiService,
    private toasterService: ToasterService,
    private clientDetailsService: ClientDetailsService,
    private dashboardService: DashboardService,
    private newAccountService: NewAccountService
  ) {}

  ngOnInit() {
   // this.onSearch();
    this.newAccountService.setFlagForShowingPages('reset');
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.dashboardService.getDashboardDetails()
        .subscribe((res: any) => {
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            const processVariables = res.ProcessVariables;
            this.purchaseOrderPendingCount = processVariables.poPendingCount;
            this.proformaInvoicePendingCount = processVariables.piPendingCount;
            this.invoicePendingCount = processVariables.invoicePendingCount;
            this.partialBillPaidCount = processVariables.partialBillPaidCount;
            const dashboardList = (processVariables.ClientDataList || []).map((value) => {
              return {
                userId: value.applicantName,
                projectNo: value.projectNumber,
                department: value.departmentName,
                state: value.state,
                status: value.activeStatus ? 'Active' : 'Inactive',
                clientId: value.id,
                insertionFlag: value.insertionFlag
              };
            });
            this.userList = dashboardList;
            this.dataSource = new MatTableDataSource<any>(dashboardList);
            this.dataSource.paginator = this.paginator;
        });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onCsvDownload(id) {
    this.dashboardService.getCsvDataForDashboard(id)
        .subscribe((res: any) => {
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            const processVariables = res.ProcessVariables;
            let resData = [];
            if (id === 'pi') {
               resData = processVariables.piList;
            } else if (id === 'po') {
              resData = processVariables.poList;
            } else if (id === 'invoicePending') {
              resData = processVariables.TotalInvoice;
            } else if (id === 'partialBill') {
              resData = processVariables.partialBill;
            }

            if (!resData) {
              return;
            }

            const attachment = processVariables.attachment;

            const fileName = attachment.name;
            this.csvData = {
              name: fileName,
              data: resData
            };
            if (!resData) {
              return this.toasterService.showInfo('No data available', '');
            }
            const dashboardList = (resData || []).map((value) => {
              return {
                userId: value.accountName,
                projectNo: value.projectNumber,
                department: value.department,
                state: value.state,
                status: value.activeStatus ? 'Active' : 'Inactive',
                clientId: value.id,
                insertionFlag: value.insertionFlag
              };
            });
            // this.userList = dashboardList;
            // this.dataSource = new MatTableDataSource<any>(dashboardList);
            // this.dataSource.paginator = this.paginator;
            // const header = Object.keys(resData[0]);

            CsvDataService.exportToCsv(fileName, resData);

            // console.log('arrayToCsv', arrayToCsv.convertArrayToCSV(resData));
        });
  }



  addUser() {
    this.utilService.setCurrentUrl('newuser');
    this.route.navigate(['/users/userInfo']);
  }

  onSearchClear() {
    this.csvData = null;
    if (!this.isSearchApiCalled) {
      return;
    }
    this.isSearchApiCalled = false;
    this.getDashboardDetails();
  }



  navigateToUser(element) {
    if (this.csvData) {
      return;
    }
    this.utilService.setProjectNumber(element.projectNo);

    // this.utilService.setUserDetails(element);

    this.clientDetailsService.setClientId(element.clientId);
    this.newAccountService.setFlagForShowingPages(element.insertionFlag);

    this.utilService.setCurrentUrl('users/customerDetails');
    this.route.navigate(['/users/customerDetails/' + element.clientId]);
  }
  sortData(sort: Sort) {
    console.log('sort data', sort.direction);
    if (!sort.direction) {
      this.dataSource = new MatTableDataSource<any>(this.userList);
      this.dataSource.paginator = this.paginator;
    }
    const data = this.userList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userId': return compare(String(a.userId || '').toLowerCase(), String(b.userId || '').toLowerCase(), isAsc);
        case 'projectNo': return compare(a.projectNo , b.projectNo, isAsc);
        case 'department': return compare(a.department, b.department, isAsc);
        case 'state': return compare(a.state, b.state, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
    // this.userList = this.sortedData;
    this.dataSource = new MatTableDataSource<any>(this.sortedData);
    this.dataSource.paginator = this.paginator;
  }

  exportCsvData() {
    console.log('csv data', this.csvData);
    CsvDataService.exportToCsv(this.csvData.name, this.csvData.data);
  }
  onSearch() {
    this.csvData = null;
    const keyword = this.searchKey || '';
    console.log('Search Value', keyword);
    const data = this.apiService.api.getAllCustomerDetails;

    const params = {
      searchKeyword: keyword,
      // fromDate: this.searchForm.get('searchFrom').value,//'2020-12-27T18:30:00.000Z',
      // toDate: this.searchForm.get('searchTo').value//'2021-01-05T18:30:00.000Z'
    };

    this.searchService
      .searchProjectExecution(data, params)
      .subscribe((resp) => {
        
        console.log('Response', resp);

        const respError = resp['ProcessVariables']['error'];

        if (respError.code == "0") {
          this.isSearchApiCalled = true;
          const result: any[] = resp["ProcessVariables"]["customerList"];
          //this.dataSource = new MatTableDataSource<any>(result);
          // console.log('result', result);
          // const DashboardList: any[] = [];
          // result.forEach((obj) => {
          //   DashboardList.push({
          //     userId: obj.applicantName,
          //     projectNo: obj.projectNumber,
          //     department: obj.departmentName,
          //     state: obj.state,
          //     status: 'Active',
          //     id: obj.userId,
          //   });
          // });

          const dashboardList = result.map((value) => {
            return {
              userId: value.applicantName,
              projectNo: value.projectNumber,
              department: value.departmentName,
              state: value.state,
              status: value.activeStatus ? 'Active' : 'Inactive',
              clientId: value.id,
              insertionFlag: value.insertionFlag
            };
          });
          this.userList = dashboardList;
          this.dataSource = new MatTableDataSource<any>(dashboardList);
          this.dataSource.paginator = this.paginator;
        } else {
          this.toasterService.showError(
            `${respError.code}: ${respError.message}`,
            'Technical error..'
          );
        }
      });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
