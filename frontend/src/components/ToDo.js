import React, { useState, useEffect } from 'react'
import NotesService from '../services/NotesService'

function ToDo() {

  const [noteList, setNoteList] = useState([])

  const [title, setTitle] = useState('')
  const [desc, setNote] = useState('')

  const getAll = async()=>{
    await NotesService.getAll()
     .then((resp)=>resp.data)
     .then((data)=>setNoteList(data))
     .catch((error)=>console.log(error))
  }

  useEffect(()=>{
    // get all notes
    async function fetchData(){  getAll();}  

    fetchData()
  },[])


  const submitNote = (buttonPassed) => {
    const newNote = {
      title: title,
      desc: desc
    }

    if(buttonPassed.id===undefined){
      NotesService.add(newNote)
      .then(()=>getAll())
    }
    else{
      newNote['id'] = buttonPassed.id
      NotesService.update(buttonPassed.id, newNote)
      .then(()=>getAll())
      console.log('updated');
    }

    //clear input once note appended to noteList
    setTitle('')
    setNote('')
    setButtonText(newNoteButton)
  }

  const deleteNote = (id)=>{
    NotesService.delete(id)
    .then(()=>getAll())
  }

  const newNoteButton = {text:'Add Note', color:'btn-primary'}
  const updateNoteButton = {text:'Update', color:'btn-success'}

  const [buttonText, setButtonText] = useState(newNoteButton)

  const editDesc = (listIndex, id)=>{
    const thisNote = noteList[listIndex]
    console.log(thisNote);
    setTitle(thisNote.title)
    setNote(thisNote.desc)
    updateNoteButton['id'] = id
    setButtonText(updateNoteButton)
  }

  return (
    <div className='to-do'>
      <div className="container py-5">

        <div className="all-notes my-5 row">

          <div className="card m-3 col-3">
            <div className="card-header">
              <h2 className='text-start'>New Note</h2>
            </div>
            <div className="card-body">
              <input name='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' placeholder='Title' />
              <textarea className='form-control' name="note" value={desc} onChange={(e) => setNote(e.target.value)} id="note" cols="30" rows="10" placeholder='Write the note details here...'></textarea>
              <button className={'btn form-control '+buttonText.color} onClick={()=>submitNote(buttonText)}>{buttonText.text}</button>
            </div>
          </div>


          {noteList.map((elem, listIndex) => {
            return (
              <div key={elem.id} className="card m-3 col-3 text-start">
                <div className="card-header">
                  <h3>{elem.title}</h3>
                </div>
                <div className="card-body" id={'note-desc-'+elem.id}>
                  <span className='note-span' style={{"whiteSpace": "preWrap"}}>{elem.desc}</span>
                  
                </div>
                <div className="card-footer row">
                  <button className='btn btn-secondary col-6' onClick={()=>editDesc(listIndex, elem.id)}>Edit</button>
                  <button className='btn btn-danger col-6' onClick={()=>deleteNote(elem.id)}>Delete</button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default ToDo