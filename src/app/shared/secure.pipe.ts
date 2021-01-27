import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http : HttpClient,private sanitizer : DomSanitizer){}

  transform(url): Observable<SafeUrl> {
    return this.http
    .get(url, { responseType: 'blob' })
    .pipe(map(val => this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(val))));
 
}

}
