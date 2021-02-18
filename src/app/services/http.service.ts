import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import RequestEntity from '@model/request.entity';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,) { }

  get(url?: string, params?: any) {
    return this.http.get(url, params);
  }

  // post(url: string, params: any) {
  //   return this.http.post(url, params);
  // }


  post(
    url: string,
    requestEntity: any,
    headers?: any
  ) {
    let requestData;
    let fileUploaduri = environment.host + environment.appiyoDrive;

    if (url.includes('login') || url == fileUploaduri || url.includes('create_session')) {
      requestData = requestEntity;
      
    } else {
      const body: RequestEntity = {
        processId: requestEntity.processId,
        ProcessVariables: requestEntity.ProcessVariables,
        workflowId: requestEntity.workflowId,
        projectId: requestEntity.projectId,
      }
      requestData = body;
     
    }
    if (headers) {
      return this.http.post(url, requestData, {
        headers: headers,
      });
    }
    // const body = requestEntity
    return this.http.post(url, requestData);

  }



  logOut() {
    let url = environment.host + 'account/logout';
    return this.get(url);
  }

}
