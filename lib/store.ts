import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  noteId: string
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface NotesState {
  notes: Note[]
  currentNoteId: string | null
  chatMessages: ChatMessage[]
  isChatOpen: boolean

  // Actions
  addNote: () => void
  updateNote: (id: string, data: Partial<Note>) => void
  deleteNote: (id: string) => void
  setCurrentNote: (id: string) => void
  addChatMessage: (message: Omit<ChatMessage, "id">) => void
  toggleChat: () => void
  setChatOpen: (isOpen: boolean) => void
}

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Initial note
const defaultNote: Note = {
  id: "default-note",
  title: "Welcome Note",
  content: "<h1>Welcome to Notes Editor</h1><p>This is your first note. You can edit it or create a new one.</p>",
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [defaultNote],
      currentNoteId: "default-note",
      chatMessages: [],
      isChatOpen: false,

      addNote: () => {
        const newNote: Note = {
          id: generateId(),
          title: "Untitled Note",
          content: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set((state) => ({
          notes: [...state.notes, newNote],
          currentNoteId: newNote.id,
        }))
      },

      updateNote: (id, data) => {
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, ...data, updatedAt: new Date() } : note)),
        }))
      },

      deleteNote: (id) => {
        const { notes, currentNoteId } = get()

        // Don't delete if it's the only note
        if (notes.length <= 1) return

        const filteredNotes = notes.filter((note) => note.id !== id)

        // If deleting the current note, select another one
        let newCurrentId = currentNoteId
        if (currentNoteId === id) {
          newCurrentId = filteredNotes[0]?.id || null
        }

        set({
          notes: filteredNotes,
          currentNoteId: newCurrentId,
          // Remove chat messages for the deleted note
          chatMessages: get().chatMessages.filter((msg) => msg.noteId !== id),
        })
      },

      setCurrentNote: (id) => {
        set({ currentNoteId: id })
      },

      addChatMessage: (message) => {
        const newMessage = {
          ...message,
          id: generateId(),
        }

        set((state) => ({
          chatMessages: [...state.chatMessages, newMessage],
        }))
      },

      toggleChat: () => {
        set((state) => ({ isChatOpen: !state.isChatOpen }))
      },

      setChatOpen: (isOpen) => {
        set({ isChatOpen: isOpen })
      },
    }),
    {
      name: "notes-storage",
    },
  ),
)
