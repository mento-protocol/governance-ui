import { Lock } from "../graphql";

export interface LockWithExpiration extends Lock {
  expiration: Date;
}
