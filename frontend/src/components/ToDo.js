import React, { useState, useEffect } from 'react'
import NotesService from '../services/NotesService'

function ToDo() {

  const [noteList, setNoteList] = useState([])

  const [title, setTitle] = useState('')
  const [desc, setNote] = useState('')

  const getAll = async () => {
    // await NotesService.getAll()
    //  .then((resp)=>resp.data)
    //  .then((data)=>setNoteList(data))
    //  .catch((error)=>console.log(error))
    // setNoteList(data)
  }

  useEffect(() => {
    // get all notes
    async function fetchData() {
      console.log("getAll()");
      // setNoteList()
    }

    fetchData()
  }, [])


  const submitNote = (buttonPassed) => {
    const newNote = {
      title: title,
      desc: desc
    }

    if (buttonPassed.id === undefined) {
      // NotesService.add(newNote)
      // .then(()=>getAll())
      console.log(newNote);
      setNoteList([...noteList, newNote])
    }
    else {
      newNote['id'] = buttonPassed.id
      NotesService.update(buttonPassed.id, newNote)
        .then(() => getAll())
      console.log('updated');
    }

    //clear input once note appended to noteList
    setTitle('')
    setNote('')
    setButtonText(newNoteButton)
  }

  // const deleteNote = (id) => {
  //   NotesService.delete(id)
  //     .then(() => getAll())
  // }

  const newNoteButton = { text: 'Add Question', color: 'btn-primary' }
  const updateNoteButton = { text: 'Update', color: 'btn-success' }

  const [buttonText, setButtonText] = useState(newNoteButton)

  // const editDesc = (listIndex, id) => {
  //   const thisNote = noteList[listIndex]
  //   console.log(thisNote);
  //   setTitle(thisNote.title)
  //   setNote(thisNote.desc)
  //   updateNoteButton['id'] = id
  //   setButtonText(updateNoteButton)
  // }

  return (
    <div className='to-do'>
      <div className="container py-5">

        <div className="card m-3 col-3" style={{ "width": "100%" }}>
          <div className="card-header">
            <h2 className='text-start'>New Question</h2>
          </div>
          <div className="card-body">
            <input name='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' placeholder='Title' />
            <textarea className='form-control' name="note" value={desc} onChange={(e) => setNote(e.target.value)} id="note" cols="30" rows="8" placeholder='Write the question description here...'></textarea>
            <button className={'btn form-control ' + buttonText.color} onClick={() => submitNote(buttonText)}>{buttonText.text}</button>
          </div>
        </div>

        <div className="all-notes my-5 row">
          {noteList.map((elem, listIndex) => {
            return (
              <div key={listIndex} className="card m-3 col-12 text-start">
                <div className="card-header">
                  <h3>{elem.title}</h3>
                </div>
                <div className="card-body" id={'note-desc-' + elem.listIndex}>
                  <span className='note-span' style={{ "whiteSpace": "preWrap" }}>{elem.desc}</span>

                </div>
                <div className="card-footer row justify-content-between">
                  <div className="left col-4 row align-center">
                    <button className='btn btn-secondary col-8' onClick={() => console.log(listIndex, elem.id)}>Answer</button>
                    <div className="upvote col-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                      </svg>
                    </div>
                    <div className="downvote col-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                      </svg>
                    </div>
                  </div>

                  <button className='btn btn-danger col-2' onClick={() => console.log(elem.id)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </span> Delete
                  </button>
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