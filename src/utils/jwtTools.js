export const decodeJwtToken = (jwtToken) => {
    if(!jwtToken || jwtToken === "") {
        return null;
    }
    const base64Url = jwtToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const setToken = (jwtToken) => {
    const tokenPayload = decodeJwtToken(jwtToken);
  
    if (!tokenPayload.exp) {
        throw new Error("JWT token is not in correct format!");
    }

    if(getToken()) {
        deleteToken();
    }

    localStorage.setItem('jwtToken', jwtToken);
};

export const getToken = () => {
    const token = localStorage.getItem('jwtToken');

    if (!token || token === "") {
        return null;
    }

    const currentTimestamp = Date.now();
    const expiryTimestamp = decodeJwtToken(token).exp * 1000;

    if (currentTimestamp >= parseInt(expiryTimestamp)) {
        deleteToken();
        return null;
    }

    return token;
};

export const deleteToken = () => {
    localStorage.removeItem('jwtToken');
};

export const hasPermission = (neededPerm, jwtToken) => {
    if(!jwtToken || jwtToken === "") {
        return false;
    }

    const userPerms = decodeJwtToken(jwtToken).authorities;
    
    for(var i in userPerms) {
        if(userPerms[i].authority === neededPerm) {
            return true;
        }
    }

    return false;
}
