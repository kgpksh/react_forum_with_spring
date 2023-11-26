export default function checkJwtExpired(){
    const token = localStorage.getItem('jwtToken')
    if(token == null) {
        return true
    }
    const base64Payload = token.split('.')[1];
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const now = new Date().getTime()
    const jwtExpiringTime = Number(JSON.parse(jsonPayload).exp) * 1000
    return jwtExpiringTime <= now
};