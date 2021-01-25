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
      processId  : '5e47716c410d11ebb7bf727d5ac274b2',
      projectId  : environment.projectIds.projectId

    },

    getProjectExecutionDetailById : {

      workflowId : 'e4537964406711ebb7bf727d5ac274b2',
      processId : '2082717240f111ebb7bf727d5ac274b2',
      projectId  : environment.projectIds.projectId

    },

    updateProjectExecutionDetail : {

      workflowId : 'e4537964406711ebb7bf727d5ac274b2',
      processId  : '2082717240f111ebb7bf727d5ac274b2',
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
      workflowId: 'e54b6d842d9511ebb77e727d5ac274b2',
      processId: 'e54b6d842d9511ebb77e727d5ac274b2',
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
      processId :  '8e09c75444fc11ebb7cb727d5ac274b2',
      projectId :  environment.projectIds.projectId
    },
    updateProformaInvoice : { 
      workflowId : '640f2fe8442a11ebb7bf727d5ac274b2',
      processId :  '8e09c75444fc11ebb7cb727d5ac274b2',
      projectId  : environment.projectIds.projectId
    },
    createTaxInvoice : {
      workflowId : '117f0f5245c211ebb7cc727d5ac274b2',
      processId  : '117f0f5245c211ebb7cc727d5ac274b2',
      projectId  :environment.projectIds.projectId
    },
    getTaxInvoiceDetails : {
      workflowId : '842375d045d011ebb7cc727d5ac274b2',
      processId  : '842375d045d011ebb7cc727d5ac274b2',
      projectId  : environment.projectIds.projectId
    },
    getTaxInvoiceDetailById : {
      workflowId : 'e027021e45d211ebb7cc727d5ac274b2',
      processId : 'e027021e45d211ebb7cc727d5ac274b2',
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
      processId: '11a3b4124a8911ebb813727d5ac274b2',
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
      projectId :'2efbdc721cc311ebb6c0727d5ac274b2',
      workflowId : 'c471fe564f5b11ebb884727d5ac274b2'
    },
 
    smsCreditAllocationSearch : {
      processId : 'acc4ed484f5d11ebb884727d5ac274b2',
      projectId : '2efbdc721cc311ebb6c0727d5ac274b2',
      workflowId : 'acc4ed484f5d11ebb884727d5ac274b2'
    },
    updateTaxnvoice: {
      processId : '117f0f5245c211ebb7cc727d5ac274b2',
      projectId :'2efbdc721cc311ebb6c0727d5ac274b2',
      workflowId : '117f0f5245c211ebb7cc727d5ac274b2'
    },
    getSmsCreditAllocationData: {
      processId : 'dac048f64b6f11ebb82e727d5ac274b2',
      projectId : '2efbdc721cc311ebb6c0727d5ac274b2',
      workflowId : 'dac048f64b6f11ebb82e727d5ac274b2'
    },

    saveOrUpdateSmsCredit: {
      processId : 'dbba1e864b5011ebb822727d5ac274b2',
      projectId : '2efbdc721cc311ebb6c0727d5ac274b2',
      workflowId : 'dbba1e864b5011ebb822727d5ac274b2'
    },

    fetchDashboardDetails: {
      processId : 'b1aaefba4aad11ebb81e727d5ac274b2',
      projectId : '2efbdc721cc311ebb6c0727d5ac274b2',
      workflowId : 'b1aaefba4aad11ebb81e727d5ac274b2'
    }

  };

  }
