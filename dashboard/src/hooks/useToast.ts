import { useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)

  function flash(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2200)
  }

  return { toast, flash }
}
