const basicHeaders = {
    'Content-Type' : 'application/json',
}
export default function useJsonFetch(url, method, headers = basicHeaders, body, successMsg = '', failMsg = '') {
    fetch(url, {
            method : method,
            headers : headers,
            body : JSON.stringify(body)
        })
        .then(res => {
            return res
        })
}