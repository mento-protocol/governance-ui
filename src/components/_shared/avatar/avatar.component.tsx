/* eslint-disable @next/next/no-img-element */
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { BlockExplorerLink } from "@/components/_shared";
import { blo, Address } from "blo";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva("overflow-hidden rounded-full", {
  variants: {
    size: {
      large: "h-[35px] w-[35px]",
      small: "h-[20px] w-[20px]",
    },
  },
  defaultVariants: {
    size: "large",
  },
});

interface AvatarProps
  extends BaseComponentProps,
    VariantProps<typeof variants> {
  address: string;
}

export const Avatar = ({ className, address, size }: AvatarProps) => {
  return (
    <div
      // TODO: border radius is 50%
      className={variants({
        className,
        size,
      })}
    >
      <BlockExplorerLink type="address" item={address}>
        <img
          src={blo(address as Address)}
          alt={`Avatar for address: ${address}`}
        />
      </BlockExplorerLink>
    </div>
  );
};
