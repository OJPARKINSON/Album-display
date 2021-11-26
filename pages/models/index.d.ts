import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AuthMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Auth {
  readonly id: string;
  readonly access_token?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Auth, AuthMetaData>);
  static copyOf(source: Auth, mutator: (draft: MutableModel<Auth, AuthMetaData>) => MutableModel<Auth, AuthMetaData> | void): Auth;
}