import { ElementType } from "react";

export interface ContentTitleProps<T extends ElementType = 'h1'> {
  as?: T,
  children?: React.ReactNode
}

export default function ContentTitle<T extends ElementType = 'h1'>({ as, children, ...props }: ContentTitleProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContentTitleProps<T>>): React.ReactNode {
  let textSize = 'text-3xl'
  const Component = as || 'h1';
  switch (as) {
    case "h2":
      textSize = 'text-xl'
      break
    case "h3":
      textSize = 'text-l'
      break
    default: break
  }
  return <Component
    {...props} className={`text-center ${textSize} aero-bg-white dark:border-black border-b-1 rounded-t-3xl py-3 ${props.className ?? ""}`}
  >{children}</Component>
}
