import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { AdminService } from '@services/admin.service'
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss']
})
export class LovsComponent implements OnInit {
 LovsControl: FormGroup;
  selectedValue:any[];
  labels: any;
  showModal:boolean=false;
  propertyFlag: boolean = false;
  isDisabledInp: boolean=true;
  isDisabled:boolean=true
  isDisabledVal:boolean=true
  isDisabledValBtn:boolean=true
  hideButton:boolean = true;
  showButton: boolean = false;
  enablebtn:boolean=true
  selectedLovs;
  labelNameKey:string='Key';
  labelNameVal:string='Value';
  labelNameDrp
  lovsList1:any[]=[];
  btnName:string=''

  detailsSubject = new Subject<any>();
  filteredOptions:any[];


  // lovsList:any[] = [
  //   { key: 0, value: 'Deparment List' },
  //   { key: 1, value: 'PO Status' },
  //   { key: 2, value: 'PI Status' },
  //   { key: 3, value: 'Payment Status' },
  //   { key: 4, value: 'PI Received In' }]


    lovsList:any = []

  deparmentList: any[] = [
    { value: 'Department of Sainik Welfare', key: 0 },
    { value: 'Ministry of Minority Affairs', key: 1 },
    { value: 'Visakhapatnam Port Trust', key: 2 },
    { value: 'Ministry of Tribal Affairs', key: 3 },
    { value: 'Bureau of Naviks Mumbai', key: 4 }];
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
  
     
  constructor(private labelsService: LabelsService,private toasterService: ToasterService,private adminService:AdminService) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });

   
    this.LovsControl=new FormGroup({
      lovControlKey:new FormControl(null),
      lovControlVal:new FormControl(null),
      labelNameDrp:new FormControl({value:'',disabled:true}),
      LOVsList:new FormControl('')
       })

       this.getLovList()


      //  this.filteredOptions = this.LovsControl.controls['labelNameDrp'].valueChanges
      //     .pipe(
      //       startWith(''),
      //       map(value => this._filter(value))
      //     );


        this.LovsControl.controls['labelNameDrp'].valueChanges.subscribe((value) => {
            this.filteredOptions =  this._filter(value)

        })


  }


  private _filter(value : string) : any{
    if(value == null) {
      return ''
    }
    const filterValue = value ? value.toLowerCase() : "";
    return this.lovsList1.filter(lov => lov.value.toLowerCase().includes(filterValue));
  }



  displayFn(SelectedId){
    if(!SelectedId)
    return ""
    let SelectedVal = this.lovsList1.filter(lov => lov.key === SelectedId)
    this.changeValDetection(SelectedVal);
    let index  = this.lovsList1.findIndex(lov => lov.key === SelectedId)
    return this.lovsList1[index].value
  }


  changeValDetection(SelectedVal){

    this.LovsControl.get('lovControlKey').patchValue(SelectedVal[0].key);
    this.LovsControl.get('lovControlVal').patchValue(SelectedVal[0].value)
    this.isDisabled=false
    this.btnName="Update"

  }

  getLovList() {
    
    this.adminService.fetchLovsList().subscribe((response)=> {

      console.log('Lov List',response)

      this.lovsList = response['ProcessVariables']['LOVList'];

    })


  }
  async onChangeLov(event){
    this.selectedLovs = event.target.value; 
  




    this.isDisabledInp=true;
    this.btnName="Add";

    this.LovsControl.patchValue({labelNameDrp : '',lovControlVal:'',lovControlKey:''
  })

  // this.LovsControl.get('labelNameDrp').disable();
  // this.LovsControl.get('labelNameDrp').updateValueAndValidity()

  
    this.enablebtn=false
    this.LovsControl.get('labelNameDrp').enable();

    this.LovsControl.patchValue({
      lovControlKey: '',
      lovControlVal: ''
    })

    let listData = []

    await this.adminService.getLovSubMenuList(this.selectedLovs).subscribe((response)=> {


      const submenuList = response['ProcessVariables']['Lovitems'];
     submenuList.forEach(element => {
        
        listData.push({key:element.key,value:element.value})
      });
    })


if(this.selectedLovs=='0'){
  this.labelNameKey=this.labels['departmentKey']
  this.labelNameVal=this.labels['departmentVal']
  this.labelNameDrp=this.labels['department']
  this.lovsList1=listData;
  this.filteredOptions = this.lovsList1;
}else if(this.selectedLovs=='1'){
  this.labelNameKey=this.labels['poStatusKey']
  this.labelNameVal=this.labels['poStatusVal']
  this.labelNameDrp=this.labels['poStatus']
  this.lovsList1=listData
  this.filteredOptions = this.lovsList1;
  }else if(this.selectedLovs=='2'){
    this.labelNameKey=this.labels['piStatusKey']
    this.labelNameVal=this.labels['piStatusVal']
    this.labelNameDrp=this.labels['piStatus']
    this.lovsList1=listData
    this.filteredOptions = this.lovsList1;
  }else if(this.selectedLovs=='3'){
      this.labelNameKey=this.labels['paymentStatusKey']
      this.labelNameVal=this.labels['paymentStatusVal']
      this.labelNameDrp=this.labels['paymentStatus']
      this.lovsList1=listData
      this.filteredOptions = this.lovsList1;
    }else if(this.selectedLovs=='4'){
        this.labelNameKey=this.labels['piReceivedKey']
        this.labelNameVal=this.labels['piReceivedVal']
        this.labelNameDrp=this.labels['piReceivedIn']
        this.lovsList1=listData
        this.filteredOptions = this.lovsList1;
      }else if(this.selectedLovs== '5') {

        this.labelNameKey='Roles Key'
        this.labelNameVal='Roles Value'
        this.labelNameDrp='Roles'
        this.lovsList1=listData
        this.filteredOptions = this.lovsList1

      }
}

  onChangeDept(event,data){
    const value = event.target.value;
    const selectedVal=data.filter(obj=>obj.key==value);
    this.LovsControl.get('lovControlKey').patchValue(selectedVal[0].key)
    this.LovsControl.get('lovControlVal').patchValue(selectedVal[0].value)
    this.btnName="Update"
    this.isDisabled=false
  }
addField(){
  this.isDisabledValBtn=false;
  this.LovsControl.patchValue({labelNameDrp : '',lovControlVal:'',lovControlKey:''
  })

  this.LovsControl.get('labelNameDrp').disable();
  this.LovsControl.get('labelNameDrp').updateValueAndValidity()
  this.hideButton=false
  this.btnName="Add"
}
editField(){
  this.LovsControl.get('labelNameDrp').enable();
  this.hideButton=false
  this.btnName="Update"
  this.isDisabledValBtn=false
 
}
deleteField(){
  this.showModal = true;
}

delete() {

  this.showModal = false;
  const deleteObj = {
    "listId":this.selectedLovs,
    "option":"delete",
    "key":this.LovsControl.value.lovControlKey

  }


  console.log(deleteObj)

  this.adminService.deleteLov(deleteObj).subscribe((response)=> {

    console.log('delete data',response)
    this.toasterService.showSuccess('Deleted Successfully','')

    let event = {
      target:{
        value: this.selectedLovs
      }
    }
    this.onChangeLov(event)
  })


}
close(){
  this.hideButton=true
  this.isDisabledValBtn=true
  this.LovsControl.patchValue({
    labelNameDrp : '',
    lovControlVal:'',
    lovControlKey:''
  })
  this.LovsControl.get('labelNameDrp').enable();
}
onCancel() {
  this.showModal = false;
}
updateField() {

}
click(evn:string){
  if(evn==='Add'){

    const insertObj = {
      listId: this.selectedLovs,
      value: this.LovsControl.value.lovControlVal,
    }

    this.adminService.insertLov(insertObj).subscribe((response)=> {

      console.log('add data', response)
      this.toasterService.showSuccess('Added Successfully','')

      let event = {
        target:{
          value: this.selectedLovs
        }
      }
      this.onChangeLov(event)

    })

  }
  else if(evn==='Update'){

    const updateObj = {
      listId: this.selectedLovs,
      key:this.LovsControl.value.lovControlKey,
      value: this.LovsControl.value.lovControlVal,
    }

    this.adminService.updateLov(updateObj).subscribe((response)=> {

      console.log('update data', response)
      this.toasterService.showSuccess('Updated Successfully','')

      let event = {
        target:{
          value: this.selectedLovs
        }
      }
      this.onChangeLov(event)

    })

  }
  
}
} 
