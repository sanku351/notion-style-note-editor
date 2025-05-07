"use client"


import { Bot } from "lucide-react"


import { useNotesStore } from "@/lib/store"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function AIButton() {
  const { toggleChat, isChatOpen } = useNotesStore()

  return (
    <Button
      className={cn(
        "absolute bottom-6 right-6 rounded-full h-12 w-12 p-0 shadow-lg transition-all",
        isChatOpen && "rotate-90",
      )}
      onClick={toggleChat}
    >
      <Bot size={20} />
    </Button>
  )
}
