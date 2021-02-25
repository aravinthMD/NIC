import { Component, OnInit, Input, Output,EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '@services/admin.service';
import { ToasterService } from '@services/toaster.service';
import { FileToBase64Service } from '@services/file-to-base64.service';
import { EmailService } from 'src/app/email.service';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {


  @Input('data') title : string = ''

  fromMail  : string;
  toMail : string;
  ccMail  : string;

  composeMsg   :string;


  @Input() showModal: boolean;

  @Output('okay') okay = new EventEmitter();

  @Output('cancel') cancel = new EventEmitter();

  emailForm: FormGroup

  attachment: {
    name?: string,
    base64?: string;
  };


  showChooseTemplate : boolean;
  showChooseTemplateBtn = true;

  TemplateList = [];

  isFirstApiCall  = true;

  id ; //Template Id

  isShowClose = false;
  @ViewChild('inputEmailFile', {static: false}) inputEmailFile: ElementRef;

  patternCheck =  {
    "rule": "^\\w+([.-]?\\w+)@\\w+([.-]?\\w+)(\\.\\w{2,10})+$",
    "msg": "Invalid email"
}

  constructor(
    private adminService: AdminService,
    private toasterService: ToasterService,
    private fileToBase64Service: FileToBase64Service,
    private emailService : EmailService) { }

    set fromAddress(value){
        this.emailForm.controls['fromAddress'].setValue(value);
    }
    get fromAddress(){
        return this.emailForm.controls['fromAddress'].value
    }

    set toAddress(value){
        this.emailForm.controls['toAddress'].setValue(value);
    }
    get toAddress(){
        return this.emailForm.controls['toAddress'].value
    }

    set subject(value){
      this.emailForm.controls['subject'].setValue(value);
    }
    get subject(){
        return this.emailForm.controls['subject'].value;
    }

    set message1(value){
      this.emailForm.controls['message1'].setValue(value);
    }
    get message1(){
        return this.emailForm.controls['message1'].value;
    }

    set Id(value){
      this.emailForm.controls['templateId'].setValue(value);
    }
    get Id(){
        return this.emailForm.controls['templateId'].value;
    }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    const userName = localStorage.getItem('userName');
    this.emailForm = new FormGroup({
      fromAddress: new FormControl(userName),
      toAddress: new FormControl('',Validators.required),
      cc: new FormControl(''),
      subject: new FormControl(''),
      message1: new FormControl(''),
      templateId : new FormControl('')
    });

  }

  // ngOnChanges() {

  //   this.initForm()
  // }

  async attachFile(event) {
    // console.log(event);
    // const file = event.target.files[0];
    try {
      this.attachment = await this.fileToBase64Service.convertToBase64(event);
      console.log('base64', this.attachment);
      this.inputEmailFile.nativeElement.value = '';
    } catch (e) {
      console.log('file error', e);
    }
  }

  removeAttachment() {
    this.attachment = null;
  }


  sendEmail() {

    const formValue = this.emailForm.value;

    const attachment = this.attachment ?  this.attachment.base64 :  '';
    const attachmentName  = this.attachment ? this.attachment.name :  '';

    console.log('formValue', formValue);


    const Data =  {
          ... formValue,
          attachment,
          attachmentName
    }

    this.adminService.sendEmailRemainder(Data).subscribe(
      (response : any) =>{
        const { 
          ProcessVariables  : { error : {
            code,
            message
          }}
        } = response;

        if(code === '0'){
            this.toasterService.showSuccess('Reminder Sent Successfully','');
            this.okay.emit()
        }else {
            this.toasterService.showError(message,'');
        }

    },(error) => {
        this.toasterService.showError('Reminder Not Sent','');
    })

  }

  onChange(event){

    let templateObj=  this.TemplateList.filter((val) => val.id === event.target.value)
    const templateObject = templateObj[0] ? templateObj[0] : {};
    this.id = templateObject.id || 0;
    // let toMailAddress = templateObject.toMailAddress || '';
    let subject = templateObject.subject || '';
    let mailContent  = templateObject.emailContent || '';

    this.setValuesToForm({subject,mailContent});


  }

  setValuesToForm(data : any){
    // this.toAddress = data.toMailAddress;
    this.subject = data.subject;
    this.message1 = data.mailContent
  }

  chooseTemplate(){

    this.showChooseTemplate = true;
    this.showChooseTemplateBtn = false;

    if(this.isFirstApiCall)
    this.getAllEmailTemplates();

  }

  Cancel(){
      this.showChooseTemplateBtn = true;
      this.showChooseTemplate = false;

      if(this.Id){
        this.resetMailForm();
        this.Id = "";
      }
        
  }

  

  getAllEmailTemplates(){
      this.emailService.getAllEmailTemplates().subscribe(
        (response : any) =>{
          const ProcessVariables = response.ProcessVariables || {};
          const error = ProcessVariables.error || {};
          if(error.code == '0'){
            this.TemplateList = ProcessVariables.templateList || [];
            this.isFirstApiCall = false;
          }else{
            return this.toasterService.showError('Failed to Fetch Data','');
          }
      })
  }

  resetMailForm(){
    this.subject = '';
    this.message1 = '';
    this.toAddress = '';
  }

  close() {
    this.cancel.emit()
  }

}
