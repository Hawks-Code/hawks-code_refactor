
export default function ContentTile({ children, ...props }: React.ComponentPropsWithoutRef<'div'>): React.ReactNode {
  return <div {...props} className={`aero-white-bg p-3 ${props.className ?? ""}`}>
    {children}
  </div>
}
