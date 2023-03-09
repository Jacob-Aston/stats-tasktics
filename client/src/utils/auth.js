//code from 21MERN>01Activities/24-Stu_decode-JWT referenced for this class

import decode from "jwt-decode";

class AuthService {
	#tokenName = "JWTToken";

	getToken() {
		const token = localStorage.getItem(this.#tokenName);
		return token;
	}

	/**
	 * after running the login mutation, store the token and go to the home page
	 */
	login(token) {
		localStorage.setItem(this.#tokenName, token);
		// window.location.assign('/stats');
	}

	logout() {
		localStorage.removeItem(this.#tokenName);
		window.location.assign("/");
	}

	loggedIn() {
		const token = this.getToken();
		//the example uses this line of code but we shouldn't need that verbosity
		//this.IsTokenExpired(token) ? true : false;
		return !(token && this.isTokenExpired(token));
	}

	isTokenExpired(token) {
		const decoded = this.getTokenInfo();
		//if experation time is greater than current time token is still vaild
		if (decoded.exp > Date.now() / 1000) return false;
		//if experation time is passed then remove the token and return true
		this.logout();
		return true;
	}

	getTokenInfo() {
		return decode(this.getToken());
	}
}

export default new AuthService();
