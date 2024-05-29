export enum AuthStates {
  Authenticated = 'Authenticated',
  UnAuthenticated = 'UnAuthenticated',
  SendRequest = 'SendRequest',
}

export enum AuthType {}

export abstract class AuthUserState {
  public saga: AuthSaga;

  public setContext(saga: AuthSaga) {
    this.saga = saga;
  }

  public abstract authenticate(): Promise<any>;
}

export class AuthSaga {
  private state: AuthUserState;

  constructor(
    payload: any,
    private kafkaService: any,
  ) {}

  setState(state: AuthStates) {
    switch (state) {
      case AuthStates.SendRequest:
        break;
      case AuthStates.Authenticated:
        break;
      case AuthStates.UnAuthenticated:
        break;
    }

    this.state.setContext(this);
  }

  getState() {
    return this.state;
  }
}
