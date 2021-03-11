// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as environmentProd } from './environment.prod';
export const environment = {
  production: false,
  projectIds: {
    projectId: 'da42c768822f11eb9221f2fa9bec3d63'
  },
  version:environmentProd.version,
  buildDate:  environmentProd.buildDate,
  apiVersion: {
    login: 'v3/',
    api: 'v2/'
  },
  // host:'http://178.128.125.44/appiyo/',
  host:  'http://128.199.164.250/appiyo/',
  appiyoDrive: "d/drive/upload/",
  previewDocappiyoDrive :  "d/drive/docs/",
  aesPublicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ+GJdSSEeaNFBLqyfM3DIOgQgWCwJ0INfeZZV7ITsLeuA7Yd02rrkYGIix1IWvoebWVmzhncUepYxHwK1ARCdUCAwEAAQ==',
  encryptionType: true, // Ecryption
  userNameDomain: '@appiyo.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
