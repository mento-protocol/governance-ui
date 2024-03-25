import { BaseError } from "viem";

export default abstract class ErrorHelper {
  public static processWagmiErrorMessage(error: Error): string {
    return (error as BaseError).shortMessage || error?.message;
  }
}
