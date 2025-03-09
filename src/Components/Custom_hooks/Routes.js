export const url = `http://srv749425.hstgr.cloud:3008`;
// export const url = `http://localhost:3008`

// export const url = `https://newhelios.onrender.com`


export const GetRoute = async (endPoint, beforeExecutionFunc, afterExecutionFunc) => {
    beforeExecutionFunc();
    const response = await fetch(`${url}/${endPoint}`);
    const data = await response.json();
    afterExecutionFunc(data);

}
export const PostRoute = async (endPoint, beforeExecutionFunc, afterExecutionFunc, body) => {
    beforeExecutionFunc();
    fetch(`${url}/${endPoint}`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            afterExecutionFunc(response)
        })
        .catch((error) => {
            console.log(error);
        })

}
