import jwtContentGetter from "./jwtContentGetter";

export default function checkJwtExpired(){
    const jsonPayload = jwtContentGetter()
    if(jsonPayload == null) {
        return true
    }
    
    const now = new Date().getTime()
    const jwtExpiringTime = Number(jsonPayload.exp) * 1000
    return jwtExpiringTime <= now
};