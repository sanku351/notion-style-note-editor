"use client"

import { useState } from "react"


import { Send, X, Bot, User } from "lucide-react"
import { ChatMessage, useNotesStore } from "@/lib/store"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"


// Dummy API response function
const getDummyResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a dummy response based on the message
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return "Hello! How can I assist you with your notes today?"
  } else if (message.toLowerCase().includes("help")) {
    return "I can help you organize your thoughts, suggest improvements to your writing, or answer questions about your notes."
  } else if (message.toLowerCase().includes("feature")) {
    return "This notes app includes rich text editing, multiple notes management, and this AI assistant to help you with your work."
  } else {
    return "I've analyzed your note and can help you expand on these ideas. Would you like me to suggest some additional points or help refine your current content?"
  }
}

export function AIChat() {
  const { chatMessages, addChatMessage, currentNoteId, setChatOpen } = useNotesStore()
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Filter messages for the current note
  const currentNoteMessages = chatMessages.filter((msg) => msg.noteId === currentNoteId)

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentNoteId) return

    // Add user message
    const userMessage: Omit<ChatMessage, "id"> = {
      content: inputValue,
      role: "user",
      noteId: currentNoteId,
    }

    addChatMessage(userMessage)
    setInputValue("")
    setIsLoading(true)

    try {
      // Get response from dummy API
      const response = await getDummyResponse(inputValue)

      // Add assistant message
      const assistantMessage: Omit<ChatMessage, "id"> = {
        content: response,
        role: "assistant",
        noteId: currentNoteId,
      }

      addChatMessage(assistantMessage)
    } catch (error) {
      console.error("Error getting response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 top-[30vh] border-t bg-background shadow-lg rounded-t-lg flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium flex items-center gap-2">
          <Bot size={16} />
          AI Assistant
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setChatOpen(false)}>
          <X size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[calc(50vh-100px)]">
        {currentNoteMessages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Bot className="mx-auto h-8 w-8 mb-2" />
            <p>How can I help you with this note?</p>
          </div>
        ) : (
          currentNoteMessages.map((message) => (
            <div
              key={message.id}
              className={cn("flex items-start gap-2 max-w-[80%]", message.role === "user" ? "ml-auto" : "mr-auto")}
            >
              <div
                className={cn(
                  "rounded-lg p-3",
                  message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted",
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                  <span className="text-xs font-medium">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                </div>
                <div>{message.content}</div>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="rounded-lg p-3 bg-muted">
              <div className="flex items-center gap-2 mb-1">
                <Bot size={14} />
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex gap-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce delay-100">•</span>
                <span className="animate-bounce delay-200">•</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask something about your note..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  )
}
