let status = '';
function afterViewInit() {
    login();
}

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
            getAccountActivationData();
        })
}

async function getAccountActivationData() {
    const processId = '1a3a029a662011eb8e53727d5ac274b2';
    const projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
    const workflowId = 'efe2a4902d5b11ebb771727d5ac274b2';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number(urlParams.get('id') || 0);
    const data = {
        id
    }
    showLoader();
    try {
    const responseData =  await buildApi(projectId, processId, workflowId, data);
    hideLoader();
    const requestId = document.getElementById('requestId');
    const applicantName = document.getElementById('applicantName');
    const department = document.getElementById('department');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const userId = document.getElementById('userId');
    const remarks = document.getElementById('remarks');
    status = responseData.status;
    requestId.innerHTML = id;
    applicantName.value = responseData.applicantName;
    department.value = responseData.department;
    city.value = responseData.city;
    state.value = responseData.state;
    userId.value = responseData.userId;
    remarks.value = responseData.remark;
    console.log('responseData', responseData);
    } catch(e) {
        hideLoader();
        showErrorMessage(e)
    }
}

async function sendUserResponse(value) {
    const processId = '1a3a029a662011eb8e53727d5ac274b2';
    const projectId = '2efbdc721cc311ebb6c0727d5ac274b2';
    const workflowId = 'efe2a4902d5b11ebb771727d5ac274b2';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = Number(urlParams.get('id') || 0);
    const data = {
        id,
        isApprove: value,
        status
    }
    showLoader();
    try {
        const responseData = await buildApi(projectId, processId, workflowId, data);
        const errorObj = responseData;
        if (errorObj.code !== '0') {
            showErrorMessage(errorObj.message, true);
        }
        hideLoader();
        showErrorMessage('Your request is submitted successfully', false);
    } catch(e) {
        hideLoader();
        showErrorMessage(e, true)
    }
}

function showErrorMessage(response) {
    showSnackbar(response, true);
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
function showLoader() {
    document.getElementById("overlay").style.display = "block";
}

function hideLoader() {
    document.getElementById("overlay").style.display = "none";
}