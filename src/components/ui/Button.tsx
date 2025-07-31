import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

// colors: {
//         purple: {
//           300: "#e0e7fe",
//           500: "#3e38a7",
//           600: "#5046e4",
//         },
//       },

export interface ButtonProps {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-[#5046e4] text-white",
  secondary: "bg-[#e0e7fe] text-[#5046e4]",
};

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};

const defaultStyles = "rounded-md flex";

export const Button = (props: ButtonProps) => {
  console.log(
    "WTF",
    `${variantStyles[props.variant]} ${defaultStyles} ${
      sizeStyles[props.size]
    } `
  );
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } `}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text} {props.endIcon}
    </button>
  );
};
