// import { sign } from 'jsonwebtoken';

class DuoClient {
  constructor(options) {
    this.HEALTH_CHECK_ENDPOINT = '/oauth/v1/health_check';
    this.AUTHORIZE_ENDPOINT = '/oauth/v1/authorize';
    this.TOKEN_ENDPOINT = '/oauth/v1/token';
    this.JTI_LENGTH = 36;
    this.JWT_EXPIRATION = 300;
    this.SIG_ALGORITHM = "HS512";
    const {clientId, clientSecret, apiHost, redirectUrl, useDuoCodeAttribute} = options;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiHost = apiHost;
    this.baseURL = `https://${this.apiHost}`;
    this.redirectUrl = redirectUrl;
  }

  generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getTimeInSeconds(date = new Date(Date.now())) {
    Math.round(date.getTime() / 1000);
  }

  /**
   * Create client JWT payload
   *
   * @private
   * @param {string} url
   * @returns {string}
   * @memberof Client
   */
  createJwtPayload(url) {
    const payload = {
      iss: this.clientId,
      sub: this.clientId,
      aud: url,
      jti: this.generateRandomString(this.JTI_LENGTH),
      iat: this.getTimeInSeconds(),
      exp: this.getTimeInSeconds() + this.JWT_EXPIRATION,
    };
    return sign(payload, this.clientSecret, { algorithm: this.SIG_ALGORITHM });
  }

  async healthCheck() {
    const url = `${this.baseURL}${this.HEALTH_CHECK_ENDPOINT}`;
    const jwtPayload = this.createJwtPayload(url);

    const request = {
      client_id: this.clientId,
      client_assertion: jwtPayload,
    };

    try {
      fetch(url, {
        method: 'POST',
        body: request,
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
      })
    } catch (error) {
      throw error
    }
  }
}
