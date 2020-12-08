import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  detectSidNav$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setCurrentUrl(data) {
        this.detectSidNav$.next(data)
    }

    clearDirty$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setClearDirty(data) {
        this.clearDirty$.next(data)
    }

    projectNumber$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setProjectNumber(data) {
        this.projectNumber$.next(data)
    }

    userDetails$:BehaviorSubject<string> = new BehaviorSubject<any>({});
    
    setUserDetails(data) {
        this.userDetails$.next(data)
    }

    getDownloadXlsFile(tabledata:any[]){
      const headers =Object.keys(tabledata[0]);
    const csvrows=[];
    csvrows.push(headers.join(','));
    
    for(const row of tabledata){
      const val =headers.map(header=>{
        const rowdata=(''+row[header]).replace(/"/g,'\\"')
        return `"${rowdata}"`
      });
     csvrows.push(val.join(','));
    }
    const data=csvrows.join('\n'); 
    const blob=new Blob([data],{type:'text/csv'});
    const url=window.URL.createObjectURL(blob);
    const a= document.createElement('a');
    a.setAttribute('hidden','');
    a.setAttribute('href',url);
    a.setAttribute('download','download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);    
      }


  constructor() { }
}
