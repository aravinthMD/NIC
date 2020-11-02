import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, ) { }

  get(url?: string, params?: any) {
    return this.http.get(url, params);
  }

  post(
    url: string,
    requestEntity: any,
    showLoader: boolean = true,
    headers?: any
  ) {

    if (headers) {
      return this.http.post(url, requestEntity, {
        headers: headers,
      });
    }
    // const body = new HttpParams({ "fromObject": requestEntity});
    const body = JSON.stringify(requestEntity);
    return this.http.post(url, body);

  }


}
