"use client"

import { useState } from 'react';
import SignIn from './components/sign-in';

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function Home() {
  // State for journal entries
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  // State for tracking the expanded entry
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  // State for new entry form inputs
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Function to add a new entry
  const handleAddEntry = () => {
    const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
    const newEntry: JournalEntry = {
      id: newId,
      title: newTitle,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      content: newContent,
    };
    setEntries([newEntry, ...entries]); // Add new entry to the beginning
    setNewTitle(''); // Reset form
    setNewContent('');
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Header */}
        <header className="mb-4 flex justify-between">
          <h1 className="text-2xl font-bold">Mini Journal</h1>
          <SignIn />
        </header>

        {/* Add New Entry Section */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New Entry</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddEntry();
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-2 w-full mb-2 rounded"
            />
            <textarea
              placeholder="Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="border p-2 w-full mb-2 rounded"
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Entry
            </button>
          </form>
        </section>

        {/* Entries List */}
        <main>
          {entries.length === 0 ? (
            <p className="text-gray-600">No entries yet. Add your first entry above.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="border p-4 mb-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  setExpandedEntryId(expandedEntryId === entry.id ? null : entry.id)
                }
              >
                <h2 className="text-xl font-semibold">{entry.title}</h2>
                <p className="text-gray-600">{entry.date}</p>
                {expandedEntryId === entry.id ? (
                  <p className="mt-2">{entry.content}</p>
                ) : (
                  <p className="mt-2">
                    {entry.content.length > 100
                      ? `${entry.content.substring(0, 100)}...`
                      : entry.content}
                  </p>
                )}
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}