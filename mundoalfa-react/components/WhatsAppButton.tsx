"use client"

import { useEffect, useState } from "react"
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button } from "@/components/ui/button"

type Props = {
  /** Número de WhatsApp en formato internacional sin signos. Ej: 5491128510721 */
  phone?: string
  /** Mensaje predeterminado que se enviará al abrir WhatsApp */
  message?: string
  /** Mostrar solo cuando el usuario hace scroll (igual que BackToTop) */
  showOnScroll?: boolean
  /** Offset de scroll para mostrar el botón cuando showOnScroll es true */
  scrollOffset?: number
}

export default function WhatsAppButton({
  phone = "5491128510721",
  message = "Hola Fede! Estoy interesado en un producto de MundoAlfa.",
  showOnScroll = false,
  scrollOffset = 200,
}: Props) {
  const [visible, setVisible] = useState(!showOnScroll)

  useEffect(() => {
    if (!showOnScroll) return

    const onScroll = () => {
      setVisible(window.scrollY > scrollOffset)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollOffset, showOnScroll])

  const handleClick = () => {
    const url = new URL(`https://wa.me/${phone}`)
    url.searchParams.set("text", message)
    // Abrir en nueva pestaña para no perder la navegación
    window.open(url.toString(), "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className="fixed right-4 z-50"
      style={{ bottom: "calc(2rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <Button
        size="icon"
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        title="Contactar por WhatsApp"
        className={`rounded-full shadow-lg transition-all duration-300 bg-green-500 hover:bg-green-600 text-white ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <WhatsAppIcon fontSize="small" />
      </Button>
    </div>
  )
}
