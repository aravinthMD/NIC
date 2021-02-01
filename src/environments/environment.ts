// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as environmentProd } from './environment.prod';
export const environment = {
  production: false,
  projectIds: {
    projectId: '2efbdc721cc311ebb6c0727d5ac274b2'
  },
  version:environmentProd.version, 
  apiVersion: {
    login: 'v3/',
    api: 'v2/'
  },
  host:'http://178.128.125.44/appiyo/',
  // host: 'https://hetrauat.equitasbank.com/appiyodev/',
  appiyoDrive: "d/drive/upload/",
  previewDocappiyoDrive :  "d/drive/docs/",
  aesPublicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ+GJdSSEeaNFBLqyfM3DIOgQgWCwJ0INfeZZV7ITsLeuA7Yd02rrkYGIix1IWvoebWVmzhncUepYxHwK1ARCdUCAwEAAQ==',
  encryptionType: true, // Ecryption
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
