import { Component, OnInit,AfterViewInit,ViewChild,Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ManageUserDialogComponent } from '../manage-user-dialog/manage-user-dialog.component';
import { LoginService} from "src/app/services/login.service";
import { AdminService } from '@services/admin.service';
import {ToasterService} from '@services/toaster.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit ,AfterViewInit {

  @Input('userObj') user : any;

  mobileNumberCodeList = []; 
  departmentListData = [];
  teleCodeValues = [];
  rolesList = []

  popupContent: string;
  totalLength: number;




  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['userId', 'UserName','EmployeeCode','Department','Role', 'CreatedOn','Action']; 

  userList : any[] = [
    {username : "Suchita",name : "Suchita",email : "suchita.patel@nic.com",mobile_no : "7689549827",role:"Admin",createdOn:"28/10/2020"},
    {username : "Abhijeet",name : "Abhijeet",email : "abhijeet.parate@nic.com",mobile_no : "7709865489",role : "Sales",createdOn : "10/09/2020"},
    {username : "KumaraV",name : "Kumara Velraj",email : "kumar.raja@nic.com",mobile_no : "9889546389",role : "Operation",createdOn : "14/08/2020"},
    {username  :"Rajesh",name : "Rajesh",email : "rajesh.gaud@nic.com",mobile_no : "8754678956",role : "Finance",createdOn : "10/07/2020"},
    {username : "GuruP",name : "Guru Prasad",email : "guru.prasad@nic.com",mobile_no : "8754895678",role : "Sales",createdOn  : "18/06/2020"},
    {username : "RanjithK",name : "Ranjith Kumar",email : "rankth@nic.com",mobile_no : "8754893365",role : "Finance",createdOn : "10/06/2020"},
    {username : "AnkitS",name : "Ankit Sharma",email : "ankit@nic.com",mobile_no : "8754890954",role : "Sales",createdOn : "10/05/2020"},
    {username :  "RajeshP",name : "Rajesh Patel",email : "rajesh.prasanth@nic.com",mobile_no : "8645789065",role : "Admin",createdOn : "09/04/2020"},
    {username  : "AajyG",name : "Ajay Gaikwad",email : "ajay.gonnade@nic.com",mobile_no : "8876490346",role : "Sales",createdOn:"07/03/2020"},
    {username  : "Ram",name : "Ram Kumar",email : "ram.guru@nic.com",mobile_no : "9876348956",role : "Operation",createdOn : "04/02/2020"},
    {username :  "Krishna",name : "Krishna",email  :"krishna.kumar@nic.com",mobile_no : "9845785438",role : "Operation",createdOn  :"16/01/2020"},
    {username : "Reshmika",name : "Reshmika",email : "reshmi.vargese@nic.com",mobile_no : "9865789456",role : "Finance", createdOn : "02/01/2020"}
  ]
  

  dataSource = new MatTableDataSource<any>(this.userList);

  showModal: boolean;

  deleteAccount: string;

  deleteUserId: string;

  constructor(
    private dialog: MatDialog,
    private loginService : LoginService,
    private adminService: AdminService,
    private toasterService: ToasterService,
    private activatedRoute : ActivatedRoute
    ) {}

  async ngOnInit() {
    this.patchLovValues();
    await this.fetchManageUsers();
  }

  patchLovValues(){
    const data  = this.activatedRoute.parent.snapshot.data || {};
    const listOfValue = data.listOfValue || {};
    const processVariables = listOfValue.ProcessVariables;
    this.mobileNumberCodeList = processVariables.mobileNumberCodeList || [];
    this.departmentListData = processVariables.admindepartment || [];
    this.teleCodeValues = processVariables.telephoneNumberCodeList || [];
    this.rolesList = processVariables.rolesList || [];
   }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  edit(element) {

    console.log(element)

    let objData = {}

    // this.adminService.getParticularAdminUser(element.userId).subscribe((response)=> {

    //   console.log('PU',response)

    //   objData = response['ProcessVariables']['usersList'][0];

      const dialogRef = this.dialog.open(ManageUserDialogComponent,{
        data: element,
      });
    // })

    dialogRef.componentInstance.countryCodeValues = this.mobileNumberCodeList;
    dialogRef.componentInstance.teleCodeValues = this.teleCodeValues;
    dialogRef.componentInstance.deparmentList = this.departmentListData;
    dialogRef.componentInstance.roleList = this.rolesList;

    dialogRef.afterClosed().subscribe(result => {
      this.fetchManageUsers();
    });


   
  }

  fetchManageUsers(currentPage?: number) {
    this.adminService.fetchAllAdminUser(currentPage).subscribe((response: any) => {
        const processVariables = response.ProcessVariables;
        this.dataSource = new MatTableDataSource<any>(processVariables.usersList);
        if (!currentPage) {
          this.dataSource.paginator = this.paginator;
          this.totalLength = processVariables.totalData;
        }
    });
  }

  onPageChange(event) {
    console.log('event', event);
    const currentPage = event.pageIndex + 1;
    this.fetchManageUsers(currentPage);
  }

  disable(element) {

    if (element.active) {
      this.popupContent = 'deactivate';
    } else {
      this.popupContent = 'activate';
    }

    this.deleteUserId = element.userId;
    this.deleteAccount = element.name;
    this.showModal = true;

  }

  delete() {

    let id = this.deleteUserId;
    const emailUrl = `${origin}/nic/assets/html/account.html?id=${id}`;

    this.adminService.deleteAdminUser(id, emailUrl).subscribe((response)=> {

      if(response['ProcessVariables']['response']['type'] == 'Success') {

        this.showModal = false;
        this.fetchManageUsers()

        this.toasterService.showSuccess(response['ProcessVariables']['response']['value'],'')
      }else {
        this.toasterService.showError(response['ProcessVariables']['response']['value'],'')
      }
    })

  }

  onCancel() {

    this.showModal = false;
  }


  

}
