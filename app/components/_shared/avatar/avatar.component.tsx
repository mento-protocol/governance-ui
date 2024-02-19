/* eslint-disable @next/next/no-img-element */
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import { create } from "ethereum-blockies";
import BlockExplorerLink from "../block-explorer-link/block-explorer-link.component";
import styles from "./avatar.module.scss";

interface AvatarProps extends BaseComponentProps {
  address: string;
}

export const Avatar = ({ className, style, address }: AvatarProps) => {
  return (
    <div className={classNames(styles.avatar, className)} style={style}>
      <BlockExplorerLink type="address" item={address}>
        <img
          src={create({
            // All options are optional
            seed: address, // seed used to generate icon data, default: random
            size: 15, // width/height of the icon in blocks, default: 8
            scale: 3, // width/height of each block in pixels, default: 4
          }).toDataURL()}
          alt={`Avatar for address: ${address}`}
        />
      </BlockExplorerLink>
    </div>
  );
};
