export function SectionStamp({
  index,
  children,
}: {
  index?: number
  children: React.ReactNode
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="border-border bg-background flex -skew-x-12 items-center border">
        <span className="flex skew-x-12 items-center gap-1.5 px-2 py-1 text-xs font-medium tracking-[0.2em] uppercase">
          {typeof index === "number" && (
            <span className="text-muted-foreground font-mono text-[10px] tracking-normal">
              {String(index).padStart(2, "0")}
            </span>
          )}
          {children}
        </span>
      </div>
      <span aria-hidden className="border-border h-0 flex-1 border-t border-dashed" />
      <span aria-hidden className="border-border bg-background h-1.5 w-1.5 shrink-0 border" />
    </div>
  )
}
