import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "remixicon/fonts/remixicon.css";

function App() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

const Heading = (e) => {
  setTitle(e.target.value);
}

const Content = (e) => {
  setContent(e.target.value);
}
  const onSubmit = (e) => {
  e.preventDefault();
  if(title === ""){
    alert("Please fill all the fields");
    return;
  }
  // const newNote =[...note];
  // newNote.push({title, content});
  // setNote(newNote);

   if (editIndex !== null) {
    const updatedNotes = [...note];
    updatedNotes[editIndex] = { title, content };
    setNote(updatedNotes);
    setEditIndex(null);
  } else {
    setNote([...note, { title, content }]);
  }
  setTitle("");
  setContent("");
}
const deleteNote = (index) => {
  setNote(note.filter((_, i) => i !== index));
};
const editNote = (index) => {
  setTitle(note[index].title);
  setContent(note[index].content);
  setEditIndex(index);  // important
};
  return (
    <>
    <div className={`min-h-0.5 items-center text-center justify-between px-6 py-4 w-screen text-white border-gray-700 border-b-2 rounded-b-lg mb-4`}>
      <h1 className='text-2xl italic font-bold '>Docu-Note</h1>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen min-w-auto items-center gap-2 grid-wrap overflow-hidden'>
      <div className='text-white bg-gray-950 min-w-1/2  rounded-2xl border-2 h-screen flex flex-col p-4 gap-4 border-gray-700'>
        <form action="submit" className="flex flex-col gap-3">
          <input type="text" value={title} placeholder="Heading" onChange={Heading} className=" italic font-extrabold text-center border-none outline-none focus:outline-none text-2xl"/>
          <textarea placeholder="Hi..." value={content} onChange={Content} className=" border-none outline-none ring-0 focus:outline-none focus:ring-0 resize-none text-left text-white min-h-100 "></textarea>
          <button className='active:bg-white hover:bg-purple-800 active:text-black border-b-2 border-b-cyan-800 rounded-2xl font-bold italic' onClick={onSubmit}>Save</button>
        </form>
      </div>
      <div className='text-white bg-gray-950 min-w-1/2 h-screen border-2 rounded-2xl border-gray-700 p-4 flex flex-col gap-4'>
        <h1 className='text-white text-center italic font-bold'>Your Notes</h1>
        <div className=' bg-gray-950 grid grid-cols-1 gap-1 p-2 h-screen overflow-y-scroll'>
          {note.map((n, index) => (
            <div key={index} className='text-left justify-center bg-black border-gray-700 border-2 rounded-2xl text-white p-2 overflow-hidden h-30 grid grid-cols-[80%_20%] gap-2'>
              <div className=' h-25 w-full overflow-hidden grid grid-rows-2 gap-1 p-2 rounded-2xl'>
                <h1 className='font-bold italic text-lg'>{n.title}</h1>
                <p className='text-left text-0xl'>{n.content}...</p>
              </div>
              <div className='gap-1 grid grid-col-1 h-25 justify-end'>
                <button className='font-bold bg-black w-25 rounded-2xl hover:bg-blue-400 ' onClick={()=> editNote(index)}><i class="ri-edit-fill text-white"></i></button>
                <button className='font-bold bg-black rounded-2xl hover:bg-red-600' onClick={()=>deleteNote(index)}>Delete</button>
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