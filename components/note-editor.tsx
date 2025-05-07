"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import { useNotesStore, type Note } from "@/lib/store"
import { EditorToolbar } from "./editor-toolbar"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"

export function NoteEditor() {
  const { notes, currentNoteId, updateNote } = useNotesStore()
  const [currentNote, setCurrentNote] = useState<Note | null>(null)

  // Find the current note
  useEffect(() => {
    const note = notes.find((n) => n.id === currentNoteId) || null
    setCurrentNote(note)
  }, [notes, currentNoteId])

  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    content: currentNote?.content || "",
    onUpdate: debounce(({ editor }) => {
      if (currentNoteId) {
        updateNote(currentNoteId, { content: editor.getHTML() })
      }
    }, 500),
    autofocus: "end",
  })

  // Update editor content when the note changes
  useEffect(() => {
    if (editor && currentNote) {
      // Only update if the content is different to avoid cursor jumping
      if (editor.getHTML() !== currentNote.content) {
        editor.commands.setContent(currentNote.content)
      }
    }
  }, [editor, currentNote])

  // Handle title change
  const handleTitleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentNoteId) {
      updateNote(currentNoteId, { title: e.target.value })
    }
  }, 500)

  if (!currentNote) return null

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b p-4">
        <Input
          className="text-xl font-bold border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          defaultValue={currentNote.title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
        />
      </div>

      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <EditorContent editor={editor} className="min-h-[calc(100vh-200px)]" />
        </div>
      </div>
    </div>
  )
}
