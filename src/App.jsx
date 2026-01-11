

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "remixicon/fonts/remixicon.css";

function App() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load notes when app starts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNote(savedNotes);
    }
  }, []);

  const Heading = (e) => {
    setTitle(e.target.value);
  }

  const Content = (e) => {
    setContent(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please fill all the fields");
      return;
    }

    let updatedNotes;

    if (editIndex !== null) {
      updatedNotes = [...note];
      updatedNotes[editIndex] = { title, content };
      setEditIndex(null);
    } else {
      updatedNotes = [...note, { title, content }];
    }

    setNote(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setTitle("");
    setContent("");
  };

  const deleteNote = (index) => {
    const updatedNotes = note.filter((_, i) => i !== index);
    setNote(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const editNote = (index) => {
    setTitle(note[index].title);
    setContent(note[index].content);
    setEditIndex(index);
  };

  return (
    <>
      <div className={`min-h-0.5 items-center text-center justify-between px-6 py-4 w-screen text-white border-gray-700 border-b-2 rounded-b-lg mb-4`}>
        <h1 className='text-2xl italic font-bold '>Docu-Note</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-full gap-2 grid-wrap'>
        <div className='text-white bg-gray-950 w-full rounded-2xl border-2 h-full flex flex-col p-4 gap-4 border-gray-700'>
          <form action="submit" className="flex flex-col gap-3 h-full">
            <input
              type="text"
              value={title}
              placeholder="Heading"
              onChange={Heading}
              className="italic font-extrabold text-center border-none outline-none text-2xl"
            />

            <textarea
              placeholder="Hi..."
              value={content}
              onChange={Content}
              className="grow border-none outline-none resize-none text-left text-white"
            ></textarea>

            <button
              className='active:bg-white hover:bg-purple-800 active:text-black border-b-2 border-b-cyan-800 rounded-2xl font-bold italic'
              onClick={onSubmit}
            >
              Save
            </button>
          </form>
        </div>

        <div className='text-white bg-gray-950 w-full h-full border-2 rounded-2xl border-gray-700 p-4 flex flex-col gap-4 min-h-0 overflow-y-auto'>
          <h1 className='text-white text-center italic font-bold'>Your Notes</h1>
          <div className='bg-gray-950 grid grid-cols-1 gap-1 p-2 overflow-y-scroll flex-1 min-h-0'>
            {note.map((n, index) => (
              <div key={index} className='text-left justify-center bg-black border-gray-700 border-2 rounded-2xl text-white p-2 overflow-hidden h-30 grid grid-cols-[80%_20%] gap-2'>
                <div className='h-25 w-full overflow-hidden grid grid-rows-2 gap-1 p-2 rounded-2xl'>
                  <h1 className='font-bold italic text-lg'>{n.title}</h1>
                  <p className='text-left text-0xl'>{n.content}...</p>
                </div>

                <div className='gap-1 grid grid-col-1 h-25 justify-end'>
                  <button className='font-bold bg-black w-25 rounded-2xl hover:bg-blue-400' onClick={() => editNote(index)}>
                    <i class="ri-edit-fill text-white"></i>
                  </button>
                  <button className='font-bold bg-black rounded-2xl hover:bg-red-600' onClick={() => deleteNote(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
