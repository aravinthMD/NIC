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
    }
  }


}
