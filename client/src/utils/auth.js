//code from 21MERN>01Activities/24-Stu_decode-JWT referenced for this class

import decode from 'jwt-decode';

class AuthService {

    #tokenName = "JWTToken";

    getToken()
    {
        const token = localStorage.getItem(this.#tokenName);
        return this.isTokenExpired(token) ? null : token;
    }

    login(token)
    {
        localStorage.setItem(this.#tokenName, token);
        window.location.assign('/');
    }
    
    logout()
    {
        localStorage.removeItem(this.#tokenName);
        window.location.reload();
    }

    loggedIn()
    {
        const token = this.getToken();
        //the example uses this line of code but we shouldnt need that verbosity
        //this.IsTokenExpired(token) ? true : false;
        return token && this.IsTokenExpired(token);
    }

    isTokenExpired(token)
    {
        const decoded = decode(token);
        //if experation time is greater than current time token is still vaild
        if(decoded.exp > (Date.now() / 1000)) return false;
        //if experation time is passed then remove the token and return true
        this.logout()
        return true;
    }
}

export default new AuthService();