"use client"

import React from 'react'
import Sidebar from './sidebar'
import { useNotesStore } from '@/lib/store'
import { NoteEditor } from './note-editor'
import { AIChat } from './ai-chat'
import { AIButton } from './ai-button'

export default function MainLayout() {
    const { isChatOpen } = useNotesStore();
    return (

        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col relative overflow-hidden'>
                <NoteEditor />
                {isChatOpen && <AIChat />}
                <AIButton />
            </div>
        </div>

    )
}
