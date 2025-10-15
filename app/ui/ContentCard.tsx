
export interface ContentCardProps {
  gridArea?: string,
  children?: React.ReactNode,
}

export default function ContentCard({ gridArea, children, ...props }: ContentCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ContentCardProps>): React.ReactNode {
  return <div {...props} className={`aero-bg-white border-1 rounded-t-3xl shadowi ${props.className ?? ""}`} style={{ gridArea }}>
    {children}
  </div>
}

