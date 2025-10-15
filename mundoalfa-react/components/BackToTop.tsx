"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show when user scrolls down a bit
      setVisible(window.scrollY > 200)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  return (
    <div
      className="fixed right-4 z-50"
      style={{ bottom: "calc(5rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <Button
        size="icon"
        onClick={handleClick}
        aria-label="Volver arriba"
        title="Volver arriba"
        className={`rounded-full shadow-lg transition-all duration-300 ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="size-5" />
      </Button>
    </div>
  )
}
