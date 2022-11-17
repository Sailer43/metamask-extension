import { ObservableStore } from '@metamask/obs-store';

/**
 * @typedef {object} InitState
 * @property {int} iat UTC timestamp for the first authentication
 * @property {int} exp UTC timestamp for the authentication expiration time
 * @property {string} token DUO Authentication Token
 */

/**
 * @typedef {object} AuthenticatorOptions
 * @property {InitState} initState The initial controller state
 */

/**
 * Controller responsible for maintaining
 * state related to onboarding
 */
export default class AuthenticatorController {
  /**
   * Creates a new controller instance
   *
   * @param {AuthenticatorOptions} [opts] - Controller configuration parameters
   */
  constructor(opts = {}) {
    const initState = {
      iat: null,
      exp: null,
      token: null,
      ...opts.initState,
    };
    this.store = new ObservableStore(initState);
  }

  /**
   * Setter for the `token`, `iat`, and `exp` property
   *
   * @param {string} token - The duo security token representing an authenticated session
   * @param {int} iat - The initial authentication time in UTC time zone
   * @param {int} exp - The session expiration time in UTC time zone
   */
  setSession(token, iat, exp) {
    this.store.updateState({ token: token, iat: iat, exp: exp });
  }
}
