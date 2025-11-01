
export interface ContentCardProps {
  gridArea?: string,
  children?: React.ReactNode,
}

export default function ContentCard({ gridArea, children, ...props }: ContentCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ContentCardProps>): React.ReactNode {
  return <div {...props} className={`aero-bg-white border-1 dark:border-black rounded-t-3xl shadow-xl ${props.className ?? ""}`} style={{ gridArea }}>
    {children}
  </div>
}

