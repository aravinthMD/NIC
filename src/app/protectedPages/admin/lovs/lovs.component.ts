import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LabelsService } from '@services/labels.service';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss']
})
export class LovsComponent implements OnInit {
 LovsControl: FormGroup;
  selectedValue:any[];
  labels: any[]
  showModal:boolean=false;
  propertyFlag: boolean = false;
  isDisabledInp: boolean=true;
  isDisabled:boolean=true
  isDisabledVal:boolean=true
  hideButton:boolean = true;
  showButton: boolean = false;
  selectedLovs;
  labelNameKey;
  labelNameVal;
  labelNameDrp
  lovsList1;
  lovsList:any[] = [
    { key: 0, value: 'Deparment List' },
    { key: 1, value: 'Po Status' },
    { key: 2, value: 'PI Status' },
    { key: 3, value: 'Payment Status' },
    { key: 4, value: 'PI Received In' }]

  deparmentList: any[] = [
    { value: 'Department of Sainik Welfare', key: 0 },
    { value: 'Minstry of minority affairs', key: 1 },
    { value: 'Vishakhapatnam port Trust', key: 2 },
    { value: 'minstry of trible affairs', key: 3 },
    { value: 'Bureasu of Naviks.Mumbai', key: 4 }];
     poStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]

     piStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]

    piReceivedIn: any[] = [
      { key: 0, value: 'Full' },
      { key: 1, value: 'Partial' }]
      
    paymentStatus: any[] = [
      { key: 0, value: 'Pending' },
      { key: 1, value: 'Received' },
      { key: 2, value: 'On Hold' }]
  
     
  constructor(private labelsService: LabelsService) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
    this.LovsControl=new FormGroup({
      lovControlKey:new FormControl(null),
      lovControlVal:new FormControl(null),
      labelNameDrp:new FormControl(''),
      LOVsList:new FormControl('')
       })
  }

  saveOrEdit() {
    return
    // if (this.buttonName == 'Edit') {
    //   this.propertyFlag = false;
    //   this.buttonName = 'Save'
    // } else {
    //   this.propertyFlag = true;
    //   this.buttonName = 'Edit'
    // }

  }
  onChangeLov(event){
    this.selectedLovs = event.target.value; 
    this.isDisabledInp=true
    this.isDisabled=false;
if(this.selectedLovs=='0'){
  this.labelNameKey=this.labels['departmentKey']
  this.labelNameVal=this.labels['departmentVal']
  this.labelNameDrp=this.labels['department']
  this.lovsList1=this.deparmentList
}else if(this.selectedLovs=='1'){
  this.labelNameKey=this.labels['poStatusKey']
  this.labelNameVal=this.labels['poStatusVal']
  this.labelNameDrp=this.labels['poStatus']
  this.lovsList1=this.poStatus
  }else if(this.selectedLovs=='2'){
    this.labelNameKey=this.labels['piStatusKey']
    this.labelNameVal=this.labels['piStatusVal']
    this.labelNameDrp=this.labels['piStatus']
    this.lovsList1=this.piStatus
    }else if(this.selectedLovs=='3'){
      this.labelNameKey=this.labels['paymentStatusKey']
      this.labelNameVal=this.labels['paymentStatusVal']
      this.labelNameDrp=this.labels['paymentStatus']
      this.lovsList1=this.paymentStatus
      }else if(this.selectedLovs=='4'){
        this.labelNameKey=this.labels['piReceivedKey']
        this.labelNameVal=this.labels['piReceivedVal']
        this.labelNameDrp=this.labels['piReceivedIn']
        this.lovsList1=this.piReceivedIn
        }
}
  onChangeDept(event){
    const value = event.target.value; 
    this.isDisabledVal=false;
    //this.boolean = false;

  //   this.selectedValue = this.deparmentList.filter(data => data.key==value);
  // this.LovsControl.patchValue({
  //   lovControlKey:this.selectedValue[0].key,
  //   lovControlVal:this.selectedValue[0].value,
  //   });
  //   this.isDisabledInp=true
  //   this.btnHide=false;

}

addField(value){

}
editField(){
  this.showButton=true
}
deleteField(value){
  this.showModal = true;
}
clearField(value){

}
onCancel() {
  this.showModal = false;
}
} 
