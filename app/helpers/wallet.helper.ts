export default abstract class WalletHelper {
  public static getShortAddress(address: string, length: number = 10): string {
    if (!address) {
      return "";
    }

    length = Math.max(1, Math.min(length, address.length - 4));
    const frontLength = Math.max(1, length - 4);
    return `${address.slice(0, frontLength)}...${address.slice(-4)}`;
  }
}
