import { Component, OnInit, Input, Output,EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from '@services/admin.service';
import { ToasterService } from '@services/toaster.service';
import { FileToBase64Service } from '@services/file-to-base64.service';

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

  subject : string;

  composeMsg   :string;


  @Input() showModal: boolean;

  @Output('okay') okay = new EventEmitter();

  @Output('cancel') cancel = new EventEmitter();

  emailForm: FormGroup

  attachment: {
    name?: string,
    base64?: string;
  };

  isShowClose = false;
  @ViewChild('inputEmailFile', {static: false}) inputEmailFile: ElementRef;

  constructor(
    private adminService: AdminService,
    private toasterService: ToasterService,
    private fileToBase64Service: FileToBase64Service) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    const userName = localStorage.getItem('userName');
    this.emailForm = new FormGroup({
      fromAddress: new FormControl(userName),
      toAddress: new FormControl(''),
      cc: new FormControl(''),
      subject: new FormControl(''),
      message1: new FormControl('')
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

    console.log('formValue', formValue);

    const Data =  {
          ... formValue,
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
            this.toasterService.showSuccess('Remainder Sent Successfully','');
            this.okay.emit()
        }else {
            this.toasterService.showError(message,'');
        }

    },(error) => {
        this.toasterService.showError('Remainder Not Sent','');
    })

  }

  close() {
    this.cancel.emit()
  }

}
