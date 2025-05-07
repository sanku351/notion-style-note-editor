"use client"

import React from 'react'
import { Button } from './ui/button'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useNotesStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'


export default function Sidebar() {
    const { notes, currentNoteId, addNote, setCurrentNote, deleteNote } = useNotesStore()
    return (
        <div className="w-64 border-r border-border h-full flex flex-col bg-muted/30">
            <div className="p-4 border-b">
                <h1 className="font-semibold text-lg">Notes</h1>
            </div>
            <div className='p-2'>
                <Button variant="outline" className='w-full justify-start gap-2' onClick={addNote}>
                    <PlusCircle size={16} />
                    New Note

                </Button>

            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={cn(
                            "p-3 rounded-md cursor-pointer mb-1 group relative",
                            currentNoteId === note.id ? "bg-secondary" : "hover:bg-muted",
                        )}
                        onClick={() => setCurrentNote(note.id)}
                    >
                        <div className="font-medium truncate">{note.title || "Untitled Note"}</div>
                        <div className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                        </div>

                        {notes.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-7 w-7"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNote(note.id)
                                }}
                            >
                                <Trash2 size={14} />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
