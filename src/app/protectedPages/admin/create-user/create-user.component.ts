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

  deparmentList : any[] = [{key:0,value:'Admin User'},{key:1,value:'Operation user'},{key:2,value:'Finance User'}];

  constructor(private labelsService: LabelsService,private formBuilder:FormBuilder) {

    this.form =this.formBuilder.group({
      name : [null],
      departmentName : [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
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

  }

}
