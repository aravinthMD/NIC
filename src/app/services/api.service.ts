import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  api = {
    getLogin: {
      workflowId: '4e04d4101cd311ebb6c2727d5ac274b2',
      processId: '52422fd01cd511ebb6c2727d5ac274b2',
      projectId: environment.projectIds.projectId,
    },

    getManageUsers : {
      workflowId : '4e04d4101cd311ebb6c2727d5ac274b2',
      processId : '99e4de201d0011ebb6c2727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    forgotPassword: {
      workflowId : 'ac548f821cc511ebb6c1727d5ac274b2',
      processId : 'ac8230a41cc511ebb6c1727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    verifyOTP: {
      workflowId : 'ac548f821cc511ebb6c1727d5ac274b2',
      processId : '6ec20a7c1db111ebb6c3727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    changePassword: {
      workflowId : 'ac548f821cc511ebb6c1727d5ac274b2',
      processId : 'a1b4c89a1daf11ebb6c3727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    createProjectExecution :  {
      workflowId : 'e4537964406711ebb7bf727d5ac274b2',
      processId  :'e487eb40406711ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId

    },

    getProjectExecutionDetailsList : {

      workflowId : 'e4537964406711ebb7bf727d5ac274b2',
      processId  : 'c72924446f5911eb9013727d5ac274b2',
      projectId  : environment.projectIds.projectId

    },

    getProjectExecutionDetailById : {

      workflowId : 'e4537964406711ebb7bf727d5ac274b2',
      processId : '30509328407311ebb7bf727d5ac274b2',
      projectId  : environment.projectIds.projectId

    },

    updateProjectExecutionDetail : {

      workflowId : 'e4537964406711ebb7bf727d5ac274b2',
      processId  : 'e487eb40406711ebb7bf727d5ac274b2',
      projectId  : environment.projectIds.projectId

    },

    deleteProjectExecution : {

      workflowId :  '',
      processId  : '6f4724a8410311ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    gtLovsList: {
      workflowId: 'bfe7bbf4408411ebb7bf727d5ac274b2',
      processId: 'bfe7bbf4408411ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    getLovSubmenuList: {
      workflowId: 'bfb43590408411ebb7bf727d5ac274b2',
      processId: 'bfe7bbf4408411ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    updateLov: {
      workflowId: 'bfb43590408411ebb7bf727d5ac274b2',
      processId: 'bfe7bbf4408411ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    deleteLov: {
      workflowId: 'bfb43590408411ebb7bf727d5ac274b2',
      processId: 'bfe7bbf4408411ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    insertLov: {
      workflowId: 'bfb43590408411ebb7bf727d5ac274b2',
      processId: 'bfe7bbf4408411ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    createAdminUser: {
      workflowId: 'f00f86cc2d5b11ebb771727d5ac274b2',
      processId: 'f00f86cc2d5b11ebb771727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    fetchAllAdminUser: {
      workflowId: '3180972e2d8711ebb77e727d5ac274b2',
      processId: '3180972e2d8711ebb77e727d5ac274b2',
      projectId : environment.projectIds.projectId
    },

    getParticularAdminUser: {
      workflowId: 'ddc8df6a2d8111ebb77e727d5ac274b2',
      processId: 'ddc8df6a2d8111ebb77e727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    
    updateAdminUser: {
      workflowId: '623531022d8911ebb77e727d5ac274b2',
      processId: '623531022d8911ebb77e727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    deleteAdminUser:{
      workflowId: 'efe2a4902d5b11ebb771727d5ac274b2',
      processId: '3c0a56807a8511eb8f6bf2fa9bec3d63',
      projectId : environment.projectIds.projectId
    },
    fetchAllProformaInvoice : {
      workflowId : '640f2fe8442a11ebb7bf727d5ac274b2',
      processId : 'd277de3844ef11ebb7c5727d5ac274b2',
      projectId  : environment.projectIds.projectId
    },
    createProformaInvoice : {
      workflowId:  '640f2fe8442a11ebb7bf727d5ac274b2',
      processId : '6438ef36442a11ebb7bf727d5ac274b2',
      projectId  : environment.projectIds.projectId
    },
    getProformaInvoiceDetailById : {
      workflowId :  '640f2fe8442a11ebb7bf727d5ac274b2',
      processId :  '5bc34f9044f711ebb7cb727d5ac274b2',
      projectId :  environment.projectIds.projectId
    },
    updateProformaInvoice : { 
      workflowId : '640f2fe8442a11ebb7bf727d5ac274b2',
      processId :  '6438ef36442a11ebb7bf727d5ac274b2',
      projectId  : environment.projectIds.projectId
    },
    createTaxInvoice : {
      workflowId : '11522f7845c211ebb7cc727d5ac274b2',
      processId  : '117f0f5245c211ebb7cc727d5ac274b2',
      projectId  :environment.projectIds.projectId
    },
    getTaxInvoiceDetails : {
      workflowId : '11522f7845c211ebb7cc727d5ac274b2',
      processId  : '842375d045d011ebb7cc727d5ac274b2',
      projectId  : environment.projectIds.projectId
    },
    getTaxInvoiceDetailById : {
      workflowId : '11522f7845c211ebb7cc727d5ac274b2',
      processId : '642880ce45d311ebb7cc727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    createPurchaseOrder: {
      workflowId: '46cfa3dc1f2b11ebb6c9727d5ac274b2',
      processId: '46cfa3dc1f2b11ebb6c9727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    fetchPurchaseOrder: {
      workflowId: '96bada94451711ebb7cb727d5ac274b2',
      processId: '96bada94451711ebb7cb727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    getPurchaseOrderById :  {
      workflowId : '4667faf21f2b11ebb6c9727d5ac274b2',
      processId : '5ca5c9287c1b11eb8ffbf2fa9bec3d63',
      projectId : environment.projectIds.projectId

    },
    updatePurchaseOrder: {
      workflowId: '06fd5a02437e11ebb7bf727d5ac274b2',
      processId: '06fd5a02437e11ebb7bf727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    createCustomerDetails: {
      workflowId: '826732c62e1611ebb77f727d5ac274b2',
      processId: '82a1e07e2e1611ebb77f727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    getCustomerDetailByCustomerId: {
      workflowId: '826732c62e1611ebb77f727d5ac274b2',
      processId: '1c6033c0491811ebb7dc727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    getAllCustomerDetails: {
      workflowId: '826732c62e1611ebb77f727d5ac274b2',
      processId: '899df1c2490c11ebb7dc727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    createTechnicalAdmin: {
      workflowId: '826732c62e1611ebb77f727d5ac274b2',
      processId: '8ef9e00648f111ebb7d2727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    getAllTechAdminDetails: {
      workflowId: '8ecc2a9448f111ebb7d2727d5ac274b2',
      processId: '2467d2d2490711ebb7dc727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    getTechAdminDetailById: {
      workflowId: '8ecc2a9448f111ebb7d2727d5ac274b2',
      processId: 'cb9e235c49e411ebb80a727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    getBillingAdminDetailById: {
      workflowId: '9bc98a7a48f111ebb7d2727d5ac274b2',
      processId: '6ad978c04a8711ebb813727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    saveOrUpdateBillingAdminDetails: {
      workflowId: '9bc98a7a48f111ebb7d2727d5ac274b2',
      processId: '9bf8ea3648f111ebb7d2727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    createBillingDetails: {
      workflowId: '9bc98a7a48f111ebb7d2727d5ac274b2',
      processId: '9bf8ea3648f111ebb7d2727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    smsCreditAllocation: {
      workflowId: 'db28bebe4b5011ebb822727d5ac274b2',
      processId: 'dbba1e864b5011ebb822727d5ac274b2',
      projectId : environment.projectIds.projectId
    },
    
    taxInvoiceSearch : {
      processId : 'c471fe564f5b11ebb884727d5ac274b2',
      projectId :environment.projectIds.projectId,
      workflowId : 'c471fe564f5b11ebb884727d5ac274b2'
    },
 
    smsCreditAllocationSearch : {
      processId : 'acc4ed484f5d11ebb884727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : 'acc4ed484f5d11ebb884727d5ac274b2'
    },
    updateTaxnvoice: {
      processId : '642880ce45d311ebb7cc727d5ac274b2',
      projectId :environment.projectIds.projectId,
      workflowId : '642880ce45d311ebb7cc727d5ac274b2'
    },
    getSmsCreditAllocationData: {
      processId : 'dac048f64b6f11ebb82e727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : 'dac048f64b6f11ebb82e727d5ac274b2'
    },

    saveOrUpdateSmsCredit: {
      processId : 'dbba1e864b5011ebb822727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : 'dbba1e864b5011ebb822727d5ac274b2'
    },

    fetchDashboardDetails: {
      processId : 'b1aaefba4aad11ebb81e727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : 'b1aaefba4aad11ebb81e727d5ac274b2'
    },

    saveOrUpdateTaxInvoice: {
      processId : '117f0f5245c211ebb7cc727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : '117f0f5245c211ebb7cc727d5ac274b2'
    },

    fetchAllTaxInvoiceDetails: {
      processId : '842375d045d011ebb7cc727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : '842375d045d011ebb7cc727d5ac274b2'
    },

    adminEmailManageAPI :  {
      processId :  '0ec35a14609011eb8c53727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId  : '4e04d4101cd311ebb6c2727d5ac274b2'
    },

    lovListAPI :  {
      processId   : "c1993588612511eb8c5d727d5ac274b2",
      // projectId :  "2efbdc721cc311ebb6c0727d5ac274b2",
      projectId :  environment.projectIds.projectId,
      workflowId : "bfb43590408411ebb7bf727d5ac274b2"
    },

    PIonLoadAPI :  {
      processId :  "0713298261eb11eb8c9d727d5ac274b2",
      // projectId :  "2efbdc721cc311ebb6c0727d5ac274b2",
      projectId :  environment.projectIds.projectId,
      workflowId :  "bfb43590408411ebb7bf727d5ac274b2"
    },

    PIonChangeAPI :  {
      processId  : "7324b1ec621b11eb8cc2727d5ac274b2",
      // projectId :  "2efbdc721cc311ebb6c0727d5ac274b2",
      projectId :  environment.projectIds.projectId,
      workflowId :  "bfb43590408411ebb7bf727d5ac274b2"
    },

    TIonLoadAPI  :{
      processId  : 'ac6255fc621d11eb8cc2727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId :  'bfb43590408411ebb7bf727d5ac274b2'
    },

    TIonChangeAPI : {
      processId :  '5fa59d2a622011eb8cc2727d5ac274b2',
      projectId  : environment.projectIds.projectId,
      workflowId  : 'bfb43590408411ebb7bf727d5ac274b2'
    },
    getReportsLov: {
      processId : '9341403e5d4911eb8bcf727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : '9341403e5d4911eb8bcf727d5ac274b2'
    },

    getReportsGridValue: {
      processId : '5f3336105d5511eb8bcf727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : '5f3336105d5511eb8bcf727d5ac274b2'
    },

    poPopupModalDataUpdate: {
      processId : 'de5c8230645c11eb8ddf727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId : '4667faf21f2b11ebb6c9727d5ac274b2'
    },
    sendEmailRemainderAPI :  {
      processId  : '1a102930653911eb8e37727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId :  '640f2fe8442a11ebb7bf727d5ac274b2'
    },
    poCsvAPI: {
      processId  : '96bada94451711ebb7cb727d5ac274b2',
      projectId : environment.projectIds.projectId,
      workflowId :  '4667faf21f2b11ebb6c9727d5ac274b2'
    },
    createAndUpdateEmailTemplate :  {
      processId  : 'd079cb464e5911ebb85b727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId :  'd04ac0584e5911ebb85b727d5ac274b2'
    },


    getEmailTemplateById :  {
      processId :  'b6ed0d885cae11eb8baf727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId :  'd04ac0584e5911ebb85b727d5ac274b2'
    },

    getAllEmailTemplates :  {
      processId  : 'f48d859a66dc11eb8e7a727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId :  'd04ac0584e5911ebb85b727d5ac274b2'
    },

    fetchAllSecurityMatrix :  {
      processId  : '236f435e4e9011ebb871727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId : '23473e9a4e9011ebb871727d5ac274b2'
    },

    fetchSecurityMatrixbyId  : {
      processId  : '8ff2ce524f2011ebb873727d5ac274b2',
      projectId  : environment.projectIds.projectId,
      workflowId :  '23473e9a4e9011ebb871727d5ac274b2'
    },

    updateSecurityMatrix   : {
        processId :  '8ff2ce524f2011ebb873727d5ac274b2',
        projectId :  environment.projectIds.projectId,
        workflowId :  '23473e9a4e9011ebb871727d5ac274b2'
    },

    getManageEmailList :  {
        processId :  '9e94d3e869dc11eb8f28727d5ac274b2',
        projectId : environment.projectIds.projectId,
        workflowId :  '23473e9a4e9011ebb871727d5ac274b2'
    },

    emailSchedulerAPI :  {
        processId :  '3a5c6c026ab711eb8f74727d5ac274b2',
        projectId :  environment.projectIds.projectId,
        workflowId :  'd04ac0584e5911ebb85b727d5ac274b2',
    },
    
    proformaInvoiceCsvDownload: {
      processId :  'fc7e66a44f2911ebb876727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId :  '640f2fe8442a11ebb7bf727d5ac274b2',
    },  
    getSmsApprove: {
      processId :  'e48c17f0661511eb8e50727d5ac274b2',
      projectId :  environment.projectIds.projectId,
      workflowId :  'db28bebe4b5011ebb822727d5ac274b2',
    },
    submitSmsApproveStatus:{
      projectId : environment.projectIds.projectId,
      processId : '0cf105546af111eb8f7d727d5ac274b2',
      workflowId : 'db28bebe4b5011ebb822727d5ac274b2',
    },
    getAuditTrails:{
      projectId : environment.projectIds.projectId,
      processId : 'ac3338766add11eb8f7d727d5ac274b2',
      workflowId : '25382108501911ebb88f727d5ac274b2'
    },
    piCsvUpload: {
      projectId : environment.projectIds.projectId,
      processId : 'da209252784711eb8f35f2fa9bec3d63',
      workflowId : 'da01f45a784711eb8f35f2fa9bec3d63'
    },
    piUploadValidData: {
      projectId : environment.projectIds.projectId,
      processId : '508b02e2784811eb8f35f2fa9bec3d63',
      workflowId : 'da01f45a784711eb8f35f2fa9bec3d63'
    },
    piCsvDataWithMessage: {
      projectId : environment.projectIds.projectId,
      processId : '9b2159be784811eb8f35f2fa9bec3d63',
      workflowId : 'da01f45a784711eb8f35f2fa9bec3d63'
    },
    getAccountActivationData:{
      projectId : environment.projectIds.projectId,
      processId : '1a3a029a662011eb8e53727d5ac274b2',     
      workflowId : 'efe2a4902d5b11ebb771727d5ac274b2'
    },sendUserResponse: {
       processId : '1a3a029a662011eb8e53727d5ac274b2',
      //  projectId : '2efbdc721cc311ebb6c0727d5ac274b2',
       projectId : environment.projectIds.projectId,
       workflowId : 'efe2a4902d5b11ebb771727d5ac274b2'
    },
    poCsvUpload: {
      projectId : environment.projectIds.projectId,
      processId : 'f4373cfa7a4e11eb8f4cf2fa9bec3d63',
      workflowId : 'f418ec0a7a4e11eb8f4cf2fa9bec3d63'
    },
    poUploadValidData: {
      projectId : environment.projectIds.projectId,
      processId : 'dd3ad5e27b3011eb8f91f2fa9bec3d63',
      workflowId : 'f418ec0a7a4e11eb8f4cf2fa9bec3d63'
    },
    poCsvDataWithMessage: {
      projectId : environment.projectIds.projectId,
      processId : 'ea9c496e7b3011eb8f91f2fa9bec3d63',
      workflowId : 'f418ec0a7a4e11eb8f4cf2fa9bec3d63'
    },
    peCsvUpload: {
      projectId : environment.projectIds.projectId,
      processId : '42c8c3167a4f11eb8f4cf2fa9bec3d63',
      workflowId : '42aa3d387a4f11eb8f4cf2fa9bec3d63'
    },
    peUploadValidData: {
      projectId : environment.projectIds.projectId,
      processId : '773d1cb87a7311eb8f67f2fa9bec3d63',
      workflowId : '42aa3d387a4f11eb8f4cf2fa9bec3d63'
    },
    peCsvDataWithMessage: {
      projectId : environment.projectIds.projectId,
      processId : '61c4057e7a7b11eb8f69f2fa9bec3d63',
      workflowId : '42aa3d387a4f11eb8f4cf2fa9bec3d63'
    },
    tiCsvUpload: {
      projectId : environment.projectIds.projectId,
      processId : '1e6a82dc7b1411eb8f75f2fa9bec3d63',
      workflowId : '1e4bfff67b1411eb8f75f2fa9bec3d63'
    },
    tiUploadValidData: {
      projectId : environment.projectIds.projectId,
      processId : 'fab917f27c1e11eb8ffbf2fa9bec3d63',
      workflowId : '1e4bfff67b1411eb8f75f2fa9bec3d63'
    },
    tiCsvDataWithMessage: {
      projectId : environment.projectIds.projectId,
      processId : 'f9e7157e7cad11eb8ffff2fa9bec3d63',
      workflowId : '1e4bfff67b1411eb8f75f2fa9bec3d63'
    },

    poCsvForBulkUpload: {
      projectId : environment.projectIds.projectId,
      processId : 'a711299874f611eb8cecf2fa9bec3d63',
      workflowId : '4667faf21f2b11ebb6c9727d5ac274b2'
    },
    poValidationMsgForBulkUpload: {
      projectId : environment.projectIds.projectId,
      processId : '5266372e809211eb9148f2fa9bec3d63',
      workflowId : '4667faf21f2b11ebb6c9727d5ac274b2'
    },
    poSaveValidDataForBulkUpload: {
      projectId : environment.projectIds.projectId,
      processId : '306438c4769211eb8e73f2fa9bec3d63',
      workflowId : '4667faf21f2b11ebb6c9727d5ac274b2'
    }


  };
}
