import { Injectable } from '@angular/core';
import { CanActivateChild} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements CanActivateChild {

  constructor(private ngxUiLoaderService: NgxUiLoaderService) { }

  canActivateChild() {

    this.ngxUiLoaderService.start();

    this.ngxUiLoaderService.stop();

    return true;
  }
}
