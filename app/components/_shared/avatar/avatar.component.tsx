/* eslint-disable @next/next/no-img-element */
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import { create } from "ethereum-blockies";
import { useAccount } from "wagmi";
import styles from "./avatar.module.scss";

interface AvatarProps extends BaseComponentProps {
  address: string;
}

export const Avatar = ({ className, style, address }: AvatarProps) => {
  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  const blockie = (
    <img
      src={create({
        // All options are optional
        seed: address, // seed used to generate icon data, default: random
        size: 15, // width/height of the icon in blocks, default: 8
        scale: 3, // width/height of each block in pixels, default: 4
      }).toDataURL()}
      alt={`Avatar for address: ${address}`}
    />
  );
  return (
    <div className={classNames(styles.avatar, className)} style={style}>
      {blockExplorerUrl ? (
        <a
          href={`${blockExplorerUrl}/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {blockie}
        </a>
      ) : (
        blockie
      )}
    </div>
  );
};
