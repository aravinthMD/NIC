import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileToBase64Service {
    constructor() {}

    convertToBase64(evt) {
        return this.toBase64(evt);
    }

    private toBase64(evt) {
        return new Promise((resolve, reject) => {
            const f = evt.target.files[0]; // FileList object
            const reader = new FileReader();
            const fileName = f.name;
            // Closure to capture the file information.
            reader.onload = ((theFile) =>  {
              return  (e) => {
                const binaryData = e.target.result;
                // Converting Binary Data to base 64
                const base64String = window.btoa(binaryData);
                resolve({
                    name: fileName,
                    base64: base64String
                });
                // showing file converted to base64
                // document.getElementById('base64').value = base64String;
                // alert('File converted to base64 successfuly!\nCheck in Textarea');
              };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsBinaryString(f);

          });
    }
}
