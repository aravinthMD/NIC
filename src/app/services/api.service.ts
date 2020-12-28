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
    }

  }


}
