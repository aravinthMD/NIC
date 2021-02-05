function buildApi(projectId, processId, workflowId, body) {

    const data = { 
        processId,
        workflowId,
        projectId,
        ProcessVariables: body,
      };
    const url = `${host}d/workflows/${processId}/${apiVersions.api}execute?projectId=${projectId}`;
    const encryption = encrypt(
        JSON.stringify(data),
        publicKey
      );
    const headers = new Headers(encryption.headers);
    headers.append('authentication-token', token);

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: 'POST',
            body: encryption.rawPayload,
            headers: headers
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
              const responseBody = JSON.parse(res);
              console.log('responseBody', responseBody);
              const error = responseBody.Error;
              const errorMessage = responseBody.ErrorMessage;
              if (error !== '0') {
                  reject(errorMessage);
              }
              const processVariables = responseBody.ProcessVariables;
              const errorObj = processVariables.error;
              if (errorObj && errorObj.code !== '0') {
                  reject(errorObj.message);
              }
              resolve(processVariables);
          })

    });
}