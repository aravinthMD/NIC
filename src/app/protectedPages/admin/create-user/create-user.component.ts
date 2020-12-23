import { Component, OnInit,Input } from '@angular/core';
import { LabelsService } from '../../../services/labels.service';
import { FormGroup,FormBuilder} from '@angular/forms';
import { AdminService } from '@services/admin.service';
import { ToasterService } from '@services/toaster.service';

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

  countryCodeValues = [
    {key:0,value:'+91'},
    {key:1,value:'+60'},
    {key:2,value:'+65'}
  ]

  teleCodeValues = [
    {key:0,value:'+044'},
    {key:1,value:'+040'},
    {key:2,value:'+080'}
  ]
  

  deparmentList : any[] = [{key:1,value:'Admin User'},{key:2,value:'Operation User'},{key:3,value:'Finance User'},{key:4,value:'Sales User'}];

  roleList: any[] = [{key:1,value:'Admin User'},{key:2,value:'Operation User'},{key:3,value:'Finance User'},{key:4,value:'Sales User'}]

  constructor(private labelsService: LabelsService,private formBuilder:FormBuilder,private adminService: AdminService,private toasterService: ToasterService) {

    this.form =this.formBuilder.group({
      userName: [null],
      password:[null],
      name : [null],
      departmentName : [''],
      roleName: [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode : [null],
      mobileNo : [null],
      telPhno : [null],
      teleCode: [null],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      remark:[null]    
    });

   }

  async ngOnInit() {


    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    let listData = []

    await this.adminService.getLovSubMenuList("0").subscribe((response)=> {


      const submenuList = response['ProcessVariables']['Lovitems'];
     submenuList.forEach(element => {
        
        listData.push({key:element.key,value:element.name})
      });
    })

    this.deparmentList = listData



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
