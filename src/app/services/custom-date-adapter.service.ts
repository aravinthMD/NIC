import { Injectable} from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class CustomDateAdapter  {

        constructor(private datePipe: DatePipe) {}

        transform(value: string, format: string) {
            try {
                return this.datePipe.transform(value, format);

            } catch (e) {
                return value;
            }
        }

        parseToDateObj(value: any): Date | Error | string {
            if (typeof value === 'string' && value.indexOf('/') > -1) {

                const str = value.split('/');
                const year = Number(str[2]);
                const month = Number(str[1]) - 1;
                const date = Number(str[0]);
                return new Date(year, month, date);

            }
            return new Date(value);
        }
}


