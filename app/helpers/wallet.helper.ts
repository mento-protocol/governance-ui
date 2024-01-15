export default abstract class WalletHelper {
  public static getShortAddress(address: string): string {
    if (!address) {
      return "";
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}
