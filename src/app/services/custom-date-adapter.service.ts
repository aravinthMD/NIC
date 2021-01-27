import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class CustomDateAdapter extends DatePipe {
        parseToDateObj(value: any): Date | Error | string {
            if (typeof value === 'string' && value.indexOf('/') > -1) {

                const str = value.split('/');
                const year = Number(str[2]);
                const month = Number(str[1]) - 1;
                const date = Number(str[0]);
                return new Date(year, month, date);

            }
            return '';
        }
}


