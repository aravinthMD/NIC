import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Validators, FormGroup,FormControl,ReactiveFormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import {map, startWith } from 'rxjs/operators';
import { ToasterService } from '@services/toaster.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UtilService } from '@services/util.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EmailService } from 'src/app/email.service';
import { AdminService } from '@services/admin.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  showinput:boolean=false;

  userName : string;

  id : number = 0;

  editTempinp:boolean=false;

  chooseTemp:boolean=false;
  schedule:boolean=false

  TemplateList  = []
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  emailIdList = [];

  isInvalidEmail: boolean;
  SelectedVal;
  emailform:FormGroup;

  // optionsScreen  = [   //HardCoded
  //   {
  //     key : 'Customer Details' , 
  //     value : '1' 
  //   },
  //   {
  //     'key' : 'Technical Admin' ,
  //      'value' :'2' 
  //     },
  //   {
  //     'key' : 'Billing Admin' ,
  //      'value'  : '3' 
  //     },
  //   {
  //     'key' : 'SMS Credit Allocation',
  //      'value' : '4'
  //     },
  //   {
  //     'key' : 'Proforma Invoice',
  //    'value'  : '5' 
  //   },
  //   {
  //     'key' : 'Project Execution' ,
  //      'value'  : '6 '
  //     },
  //   {
  //     'key': 'Purchase Order',
  //     'value'  : '7'
  //    },
  //   {
  //     'key': 'Tax Invoice',
  //      'value' :  '8' 
  //     },
  //   {
  //     'key' : 'Reports' ,
  //      'value'  : '9'
  //     },
  //   {
  //     'key'  : 'Email' , 
  //     'value'  : '10'
  //   }
  // ];


  // screenNameDropDownList = [
  //   'Customer Details',
  //    'Technical Admin',
  //    'Billing Admin',
  //    'SMS Credit Allocation',
  //    'Proforma Invoice',
  //    'Project Execution',
  //    'Purchase Order',
  //    'Tax Invoice',
  //    'Reports',
  //    'Email'
  // ];

  screenNameDropDownList = [
    'Billing Admin',
    'SMS Credit Allocation',
    'Proforma Invoice'
  ]

  dropdownSettings : IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    itemsShowLimit: 2,
  };
  

  options: string[] = ['00.00', '00.30', '01.00', '01.30','02.00', '02.30',
  , '03.00', '03.30','04.00', '04.30','05.00', '05.30', '06.00', '06.30', '07.00', '07.30',
  , '08.00', '08.30','09.00', '09.30','10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  , '13.00', '13.30','14.00', '14.30','15.00', '15.30', '16.00', '16.30', '17.00', '17.30',
  , '18.00', '18.30','19.00', '19.30','20.00', '20.30', '21.00', '21.30', '22.00', '22.30',
  , '23.00', '23.30'];
  options1: string[] = ['00.00', '00.30', '01.00', '01.30','02.00', '02.30',
  , '03.00', '03.30','04.00', '04.30','05.00', '05.30', '06.00', '06.30', '07.00', '07.30',
  , '08.00', '08.30','09.00', '09.30','10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  , '13.00', '13.30','14.00', '14.30','15.00', '15.30', '16.00', '16.30', '17.00', '17.30',
  , '18.00', '18.30','19.00', '19.30','20.00', '20.30', '21.00', '21.30', '22.00', '22.30',
  , '23.00', '23.30'];
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
today=new Date()
  constructor(
    private toasterService: ToasterService,
    private router: Router,
    private utilService: UtilService,
    private emailService: EmailService,
    private adminService: AdminService) {

    this.userName = localStorage.getItem('userName') || '';

   }


   set fromMailAddress(value){
      this.emailform.controls['FromMailAddress'].setValue(value)
   }

   get fromMailAddress() {
      return this.emailform.controls['FromMailAddress'].value;
   }

   set toMailAddress(value){
      this.emailform.controls['ToMailAddress'].setValue(value);
   }

   get toMailAddress(){
      return this.emailform.controls['ToMailAddress'].value;
   }

   set Subject(value){
      this.emailform.controls['subject'].setValue(value);
   }

   get Subject(){
     return this.emailform.controls['subject'].value;
   }

   set mailContent(value){
      this.emailform.controls['mailContent'].setValue(value)
   }

   get mailContent(){
      return this.emailform.controls['mailContent'].value;
   }

   set templateName(value){
    this.emailform.controls['templateName'].setValue(value);
   }

   get templateName(){
     return this.emailform.controls['templateName'].value;
   }

   set screenList(value){
        this.emailform.controls['screenList'].setValue(value);
   }

   get screenList(){
        return this.emailform.controls['screenList'].value;
   }

   set fromScheduleDate(value){
        this.emailform.controls['fromScheduleDate'].setValue(value);
   }

   get fromScheduleDate(){
      return this.emailform.controls['fromScheduleDate'].value;
   }

   set toScheduleDate(value){
      this.emailform.controls['toScheduleDate'].setValue(value);
   }

   get toScheduleDate(){
      return this.emailform.controls['toScheduleDate'].value;
   }

   set scheduleTime(value){
      this.emailform.controls['scheduleTime'].setValue(value);
   }

   get scheduleTime(){
     return this.emailform.controls['scheduleTime'].value;
   }


  ngOnInit() {

    this.initForm();
  
this.filteredOptions = this.emailform.get('fromScheduleDate').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.filteredOptions1 = this.emailform.get('toScheduleDate').valueChanges
      .pipe(
        startWith(''),
        map(val => this._filter1(val))
      );
  }


  initForm(){
    this.emailform=new FormGroup({

      FromMailAddress : new FormControl(this.userName),
      ToMailAddress : new FormControl(''),
      subject:new FormControl(''),
      mailContent:new FormControl(''),

      templateName : new FormControl(''),

      selectedTemp:new FormControl(''),
      screenList: new FormControl(),
      screenNameEdit: new FormControl(''),
      renameTemplate:new FormControl(''),
      scheduleTime:new FormControl(),
      fromScheduleDate: new FormControl(),
      toScheduleDate: new FormControl()
    })
  }

  sendEmail() {
    const formValue = this.emailform.value;
    const toAddress = formValue.ToMailAddress;
    const subject = formValue.subject;
    const message1 = formValue.mailContent;
    const fromAddress = formValue.FromMailAddress;
    if (!toAddress) {
      return this.toasterService.showError('Please enter the to mail address', '');
    }
    if (!subject) {
      return this.toasterService.showError('Please enter the subject', '');
    }
    if (!message1) {
      return this.toasterService.showError('Please enter the message', '');
    }
    const data = {
      fromAddress,
      message1,
      subject,
      toAddress };
    console.log('data', data);
    this.adminService.sendEmailRemainder(data)
          .subscribe((res: any) => {
             const error = res.Error;
             const errorMessage = res.ErrorMessage;
             if (error !== '0') {
               return this.toasterService.showError(errorMessage, '');
             }
             const processVariables = res.ProcessVariables;
             const errorObj = processVariables.error;
             if (errorObj.code !== '0') {
               return this.toasterService.showError(errorObj.message, '');
             }
             this.emailform.reset();
             this.emailIdList = [];
             return this.toasterService.showSuccess('Mail Sent Successfully', '');
          });
  }

  

  private _filter(value: string): string[] {
    if(!value)
      return
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(val: string): string[] {
      if(!val)
        return
    const filterVal = val.toLowerCase();
    return this.options1.filter(opt => opt.toLowerCase().includes(filterVal));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (!RegExp('^\\w+([.-]?\\w+)@\\w+([.-]?\\w+)(\\.\\w{2,10})+$').test(value) && value != '') {
        this.isInvalidEmail = true;
        return;
    }else {
      this.isInvalidEmail = false;
    }
    if ((value || '').trim()) {
      this.emailIdList.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }
  
  remove(Email: any): void {
    const index = this.emailIdList.indexOf(Email);
    if (index >= 0) {
      this.emailIdList.splice(index, 1);
    }
  }
  saveTemplete(){
    this.emailform.patchValue({
      selectedTemp: '',
      screenName:''
    })
    this.showinput=true
    this.chooseTemp=false
    this.editTempinp=false
  }

  cancel(){
    this.showinput = false;
    this.chooseTemp = false;
    this.editTempinp = false;
    this.schedule = false;
    this.emailform.reset();
  }
  chooseTemplete(){
    this.chooseTemp = true
    this.showinput = false
    this.editTempinp = false

    this.getAllEmailTemplates();
  }

  editTemplete(){
    this.editTempinp = true;
  }

  onChange(event){

    let templateObj=  this.TemplateList.filter((val) => val.id === event.target.value)
    const templateObject = templateObj[0] ? templateObj[0] : {};
    this.id = templateObject.id || 0;
    // let fromMailAddress = templateObject.fromMailAddress || '';
    let toMailAddress = templateObject.toMailAddress || '';
    let subject = templateObject.subject || '';
    let mailContent  = templateObject.emailContent || '';
    let templateName = templateObject.templateTitle || '';
    let screenList = templateObject.screenName || '';
    let screenNameListArray = screenList.split(",");
    this.setToFormMethod({toMailAddress,subject,mailContent,templateName,screenNameListArray});
  }

  setToFormMethod(data  : any){
      // this.fromMailAddress = data.fromMailAddress,
      this.toMailAddress = data.toMailAddress;
      this.Subject = data.subject;
      this.templateName = data.templateName;
      this.screenList = data.screenNameListArray;
      this.mailContent  = data.mailContent;
  }

  detectDateKeyAction(event,type) {

    console.log(event)
   if(type == 'fromDate') {
      this.emailform.patchValue({
        fromScheduleDate: ''
      })
      this.toasterService.showError('Please click the from date icon to select date','');
    }else if(type == 'toDate') {
      this.emailform.patchValue({
        toScheduleDate: ''
      })
      this.toasterService.showError('Please click the to date icon to select date','');
    }
  }
  saveOrUpdateTemplate(){

    const FromMailAddress = this.emailform.controls['FromMailAddress'].value;
    // const ToMailAddress = this.emailform.controls['ToMailAddress'].value;
    const ToMailAddress = this.ListToStringConverter(this.emailIdList);
    const templateName = this.emailform.controls['templateName'].value;
    const subject = this.emailform.controls['subject'].value;
    const mailContent = this.emailform.controls['mailContent'].value;
    const ScreenList = this.emailform.controls['screenList'].value;

    const ScreenNameList = this.ListToStringConverter(ScreenList);
  

    const data =  {
      FromMailAddress,
      ToMailAddress,
      subject,
      mailContent,
      templateName,
      screenList : ScreenNameList,
      id : Number(this.id) 
    }
      
    this.emailService.createandEditEmailTemplates(data).subscribe(
      (response) =>{

        const ProcessVariables = response['ProcessVariables'] || {};
        const error = ProcessVariables.error || {};

        if(error.code == '0'){
            this.toasterService.showSuccess('Email Template Saved Successfully','');
            this.emailFormReset();
            this.getAllEmailTemplates();
        }else{
            this.toasterService.showError(error.message,'');
        }
    },(error) =>{
        this.toasterService.showError('Email Template Failed to Save',error.message);
    })
    

  }

  emailFormReset(){
      this.toMailAddress = '';
      this.Subject = '';
      this.templateName = '';
      this.mailContent = '';
      this.screenList = '';
      this.emailIdList = [];
      this.emailform.controls['selectedTemp'].setValue([]);
      this.editTempinp = false;
  }


  ListToStringConverter(inputList){

    if(inputList.length > 0){
        let outputString  = '';
            for(let i = 0 ; i < inputList.length ; i++){

              if(i != inputList.length -1)
                   outputString = outputString +inputList[i]+ ',';
              else
                  return outputString = outputString + inputList[i];
            }
    }else 
        return '';
  }

  getEmailTemplateById(){
        this.emailService.getEmailTemplateById(this.id).subscribe(
          (response) => {
            const ProcessVariables = response['ProcessVariables'] || {};
            const error = ProcessVariables.error || {};
            if(error.code !== '0'){
              const FromMailAddress = ProcessVariables.FromMailAddress || '';
              this.fromMailAddress = FromMailAddress;
              const ToMailAddress = ProcessVariables.ToMailAddress || '';
              this.toMailAddress = ToMailAddress;
              const templateName = ProcessVariables.templateName;
              this.templateName = templateName;
              const mailContent = ProcessVariables.mailContent || '';
              this.mailContent = mailContent;
            }else{
              this.toasterService.showError(error.message,'');
            }
        },(error) =>{
            return this.toasterService.showError('Failed to Fetch Data','');
        })
  }

  async getAllEmailTemplates(){
     await this.emailService.getAllEmailTemplates().subscribe(
        (response) =>{
          const ProcessVariables = response['ProcessVariables'] || {};
            const error = ProcessVariables.error || {};
            if(error.code == '0'){
                console.log('API"s',response);
                this.TemplateList = ProcessVariables.templateList || [];
            }else{
                return this.toasterService.showError('Failed to Fetch Data','');
            }
      })
  }

  emailScheduler(){
      const FromMailAddress = this.fromMailAddress;
      const ToMailAddress = this.toMailAddress;
      const subject = this.Subject;
      const mailContent = this.mailContent;

      const templateId = this.id;
      const ScheduledFromDate = this.fromScheduleDate;
      const ScheduledToDate = this.toScheduleDate;
      const ScheduledTime = this.scheduleTime


      const Data = {
        FromMailAddress,
        ToMailAddress,
        subject,
        mailContent,
        templateId,
        ScheduledFromDate,
        ScheduledToDate,
        ScheduledTime
      }

      this.adminService.emailScheduler(Data).subscribe(
        (response : any) => {

          const ProcessVariables = response.ProcessVariables || {};
          const error = ProcessVariables.error || {};

          if(error.code === '0'){
              this.toasterService.showSuccess("Email Scheduled Successfully",'');

          }else{

            this.toasterService.showError(error.message,'')

          }
      },(error) => {
          this.toasterService.showError(error.message,'');
      })



  }

 
  update(){
    this.saveOrUpdateTemplate();
  }

  home() {

    this.utilService.setCurrentUrl('dashboard')
    this.router.navigate(['/users/Dashboard'])
  }

}
