import BaseIconProps from "@/interfaces/base-icon-props.interface";

export const IndexWrapperIcon = ({
  width = 30,
  height = 30,
  className,
}: BaseIconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        className="fill-primary"
        d="M4.33079 22.3969C4.33079 23.7889 5.45967 24.9205 6.85221 24.9205L24.9754 24.9205V29.0612L6.49105 29.0612C3.00969 29.0612 0.1875 26.2401 0.1875 22.7601L0.1875 4.25195H4.33079L4.33079 22.3969Z"
      />
      <path
        className="fill-primary"
        d="M24.9758 6.77692C24.9758 5.38491 23.847 4.25334 22.4544 4.25333L4.33119 4.25333V0.1126L22.8156 0.11261C26.2969 0.112617 29.1191 2.93374 29.1191 6.41377V24.9219H24.9758V6.77692Z"
      />
    </svg>
  );
};
