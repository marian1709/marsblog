import auth0 from "auth0-js";
import EventEmitter from "EventEmitter";
import router from "./../router";

export default class AuthService {
  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();
  requestedScopes = "openid profile create:news read:news update:news delete:news";

  constructor() {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: "marsbook.eu.auth0.com",
    clientID: "XOsvG6jzu5pyEkevB5qUdkCCbFpMLAbL",
    redirectUri: "http://localhost:8081/callback",
    audience: "http://localhost:3333",
    responseType: "token id_token",
    scope: this.requestedScopes
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        // TODO: Marian - Handle error
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    const scopes = authResult.scope || this.requestedScopes || "";

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("user", JSON.stringify(authResult.idTokenPayload));
    localStorage.setItem("scopes", JSON.stringify(scopes));
    this.authNotifier.emit("authChange", {
      authenticated: true
    });

    router.replace("/");
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    localStorage.removeItem("scopes");
    this.authNotifier.emit("authChange", {
      authenticated: false
    });

    router.replace("/");
  }

  // eslint-disable-next-line
  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  // eslint-disable-next-line
  userHasScopes(scopes) {
    const grantedScopes = JSON.parse(localStorage.getItem("scopes")).split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
