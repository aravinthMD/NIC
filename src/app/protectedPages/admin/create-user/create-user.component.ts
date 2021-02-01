import { Component, OnInit,Input } from '@angular/core';
import { LabelsService } from '../../../services/labels.service';
import { FormGroup,FormBuilder} from '@angular/forms';
import { AdminService } from '@services/admin.service';
import { ToasterService } from '@services/toaster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  @Input('userObj') user : any;

  propertyFlag: boolean;

  labels: any = {};

  form: FormGroup;

  isDirty: boolean;

  passwordValidation: {
    rule?: any;
    msg?: string;
  }[];

  countryCodeValues = []

  teleCodeValues = []
  

  deparmentList : any[] = [];

  roleList: any[] = []

  constructor(
    private labelsService: LabelsService,
    private formBuilder:FormBuilder,
    private adminService: AdminService,
    private toasterService: ToasterService,
    private route : ActivatedRoute
    ) {

    this.deparmentList = this.route.parent.snapshot.data.listOfValue['ProcessVariables']['departmentList'] || [];
    this.countryCodeValues = this.route.parent.snapshot.data.listOfValue['ProcessVariables']['mobileNumberCodeList'] || [];
    this.teleCodeValues = this.route.parent.snapshot.data.listOfValue['ProcessVariables']['telephoneNumberCodeList'] || [];
    this.roleList = this.route.parent.snapshot.data.listOfValue['ProcessVariables']['rolesList'] || [];

    this.form =this.formBuilder.group({
      userName: [null],
      password:[null],
      name : [null],
      departmentName : [''],
      roleName: [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode : [this.countryCodeValues[0].key],
      mobileNo : [null],
      telPhno : [null],
      teleCode: [this.teleCodeValues[0].key],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      remark:[null]    
    });

   }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })
    this.passwordValidation = this.passwordValidationCheck()
  }

  passwordValidationCheck() {

    const password = [
      {
        rule: (val) => {

          const checkSpecial = /[*@!#$%&()^~{}]+/.test(val);
          const checkNumber = /[0-9]+/.test(val)
          const minValLen = val.length;

          return !checkSpecial || !checkNumber || minValLen < 6;
        },
        msg: 'Password must contain atleast 6 characters with atleast one symbol and one numeric',
      }
    ];
    return password;
  }



  onSubmit(){

    if(this.form.invalid) {
      this.isDirty = true;
      return;
    }

    const userData = {
      "name":this.form.value.name,
      "userName":this.form.value.userName,
      "passWord":this.form.value.password,
      "department":this.form.value.departmentName,
      "role":this.form.value.roleName,
      "designation":this.form.value.designation,
      "employeeCode":this.form.value.employeeCode,
      "emailAddress":this.form.value.email,
      "mobileNumber":this.form.value.mobileNo,
      "telephoneNumber":this.form.value.telPhno,
      "officialAddress1":this.form.value.offAddress1,
      "officialAddress2":this.form.value.offAddress2,
      "officialAddress3":this.form.value.offAddress3,
      "city":this.form.value.city,
      "state":this.form.value.state,
      "pinCode":this.form.value.pinCode,
      "mobileCode":this.form.value.countryCode,
      "telephoneCode":this.form.value.teleCode,
      "remarks":this.form.value.remark
    }

    this.adminService.createAdminUser(userData).subscribe((response)=> {

      console.log('Response',response)

      if(response['Error'] == '0' && response['ProcessVariables']['response']['type'] == 'Success') {

        this.isDirty=false;
        this.form.reset()
        this.toasterService.showSuccess(response['ProcessVariables']['response']['value'],'')

      }else {
        this.toasterService.showError(response['ProcessVariables']['response']['value'],'')
      }

    })
  }

}
