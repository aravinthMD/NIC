import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UtilService } from "../../services/util.service";
import { SearchService } from "../../services/search.service";
import { ApiService } from "../../services/api.service";
import { ToasterService } from "@services/toaster.service";
import { ClientDetailsService } from "@services/client-details.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  displayedColumns: string[] = [
    "UserID",
    "projectNo",
    "Department",
    "State",
    "Status",
  ];

  userList: any[] = [];

  dataSource = new MatTableDataSource<any>(this.userList);

  constructor(
    private route: Router,
    private utilService: UtilService,
    private searchService: SearchService,
    private apiService: ApiService,
    private toasterService: ToasterService,
    private clientDetailsService: ClientDetailsService
  ) {}

  ngOnInit() {
    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addUser() {
    this.utilService.setCurrentUrl("newuser");
    this.route.navigate(["/users/userInfo"]);
  }

  navigateToUser(element) {
    this.utilService.setProjectNumber(element.projectNo);

    this.utilService.setUserDetails(element);

    this.clientDetailsService.setClientId(element.clientId);

    this.utilService.setCurrentUrl("users/customerDetails");
    this.route.navigate(["/users/customerDetails/" + element.clientId]);
  }
  onSearch() {
    const keyword = this.searchKey || "";
    console.log("Search Value", keyword);
    const data = this.apiService.api.getAllCustomerDetails;

    const params = {
      searchKeyword: keyword,
      // fromDate: this.searchForm.get('searchFrom').value,//"2020-12-27T18:30:00.000Z",
      // toDate: this.searchForm.get('searchTo').value//"2021-01-05T18:30:00.000Z"
    };

    this.searchService
      .searchProjectExecution(data, params)
      .subscribe((resp) => {
        console.log("Response", resp);

        const respError = resp["ProcessVariables"]["error"];

        if (respError.code == "600") {
          const result: any[] = resp["ProcessVariables"]["customerList"];
          //this.dataSource = new MatTableDataSource<any>(result);
          // console.log("result", result);
          // const DashboardList: any[] = [];
          // result.forEach((obj) => {
          //   DashboardList.push({
          //     userId: obj.applicantName,
          //     projectNo: obj.projectNumber,
          //     department: obj.departmentName,
          //     state: obj.state,
          //     status: "Active",
          //     id: obj.userId,
          //   });
          // });

          const dashboardList = result.map((value) => {
            return {
              userId: value.applicantName,
              projectNo: value.projectNumber,
              department: value.departmentName,
              state: value.state,
              status: "Active",
              clientId: value.id,
            }
          })

          this.dataSource = new MatTableDataSource<any>(dashboardList);
        } else {
          this.toasterService.showError(
            `${respError.code}: ${respError.message}`,
            "Technical error.."
          );
        }
      });
  }
}
