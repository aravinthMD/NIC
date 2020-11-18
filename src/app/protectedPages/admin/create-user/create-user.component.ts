import { Component, OnInit,Input } from '@angular/core';
import { LabelsService } from '../../../services/labels.service';
import { FormGroup,FormBuilder} from '@angular/forms';

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
  

  deparmentList : any[] = [{key:0,value:'Admin User'},{key:1,value:'Operation user'},{key:2,value:'Finance User'}];

  constructor(private labelsService: LabelsService,private formBuilder:FormBuilder) {

    this.form =this.formBuilder.group({
      userName: [null],
      password:[null],
      name : [null],
      departmentName : [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode : [null],
      mobileNo : [null],
      telPhno : [null],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null]
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
    }
  }

}
