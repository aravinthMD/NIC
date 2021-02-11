let token = '';


function login() {
   const email = 'akshaya.venkataraman@appiyo.com';
   const password = 'inswit@123';
   const params = {
       email,
       password
   };
   const encryption = encrypt(
        JSON.stringify(params),
        publicKey
      );
   const url = `${host}account/${apiVersions.login}login`
   fetch(url, {
      body: encryption.rawPayload,
      method: 'POST',
      headers: encryption.headers
   }).then(async (res) => {
       const body = await res.text();
       res  = {
           body: body,
           bodyUsed: false,
           headers: res.headers,
           ok: res.ok,
           redirected: res.redirected,
           status: res.status,
           statusText: res.statusText,
           type: res.type,
           url: res.url
       }
       return res
   })
   .then((res) => {
         return decryptResponse(res)
      })
     .then(res => {
         const loginResponse = JSON.parse(res);
         console.log('loginResponse', loginResponse);
         token = loginResponse.token;
         getData();
     })
}


function showLoader() {
    document.getElementById("overlay").style.display = "block";
}

function hideLoader() {
    document.getElementById("overlay").style.display = "none";
}
function afterViewInit() {
    login();
}

function showSnackbar(message, isError = false) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    if(isError) {
        x.classList.add('snackbar-error');
    } else {
        x.classList.remove('snackbar-error');
    }
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


async function getData() {
    const requestId = document.getElementById('requestId');
    const accountName = document.getElementById('accountName');
    const projectNumber = document.getElementById('projectNumber');
    const department = document.getElementById('department');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const requestedCredits = document.getElementById('requestedCredits');
    const dateOfRequest = document.getElementById('dateOfRequest');
    const requestRaisedBy = document.getElementById('requestRaisedBy');
    const approverEmailId = document.getElementById('approverEmailId');
    const approverName = document.getElementById('approverName');
    const approvedOnBehalf = document.getElementById('approvedOnBehalf');
    const dateOfApproval = document.getElementById('dateOfApproval');
    const remarks = document.getElementById('remarks');
    const comments = document.getElementById('comments');
    const urlString = location.href;
    const url = new URL(urlString);
    showLoader();
    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = Number(urlParams.get('id') || 0);
        const response = await getSmsCreditAllocationData();
        requestId.innerHTML = id;
        accountName.value = response.accountName;
        projectNumber.value = response.projectNumber;
        approverName.value = response.approvedBy;
        dateOfRequest.value = response.dateOfRequest;
        dateOfApproval.value = response.dateOfApproval;
        approvedOnBehalf.value = response.onApprovalOf;
        requestedCredits.value = response.requestedCredit;
        remarks.value = response.remark;
        department.value = response.department;
        city.value = response.city;
        state.value = response.state;

        hideLoader();
    } catch(e) {
        console.log('response error', e)
        hideLoader();
        showErrorMessage(e)
    }
}

function showErrorMessage(response) {
    showSnackbar(response, true);
    // const error = response.error;
    // const errorMessage = response.ErrorMessage;
    // if (error !== '0') {
    //     return showSnackbar(errorMessage, true);
    // }
    // const processVariables = response.ProcessVariables;
    // const errorObj = processVariables.error;
    // if (errorObj.code !== '0') {
    //     return showSnackbar(errorObj.message, true);
    // }
    // return false;
}

async function getSmsCreditAllocationData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number(urlParams.get('id') || 0);
    const token = urlParams.get('token');
    const projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
    const processId = 'e48c17f0661511eb8e50727d5ac274b2';
    const workflowId = 'db28bebe4b5011ebb822727d5ac274b2';
    const data = {id};
    return await buildApi(projectId, processId, workflowId, data);
    
}

async function sendUserResponse(status) { // '1': approved    '2': rejected
    const projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
    const processId = '0cf105546af111eb8f7d727d5ac274b2';
    const workflowId = 'db28bebe4b5011ebb822727d5ac274b2';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number(urlParams.get('id') || 0);
    const statusComment = document.getElementById('comments').value;

    const data = {
                    id,
                    status,
                    statusComment,
                 };
    console.log('data', data);
    showLoader();
    try {
        const response  = await buildApi(projectId, processId, workflowId, data);
        showSnackbar('Your request is submitted successfully');
        hideLoader();
    } catch(e) {
      console
       hideLoader();
    }
    
    // console.log('response', response);
    // if (showErrorMessage(response)) {
    //     return;
    // }
   
    // console.log('response', response);
}

