import React from 'react'
import {useState} from 'react';
import logo from '../logo.svg';

function ChangeText() {

    const [data, setData] = useState(
        {
          text:'Hi Prathmesh',
          flag:1
        }
      )
    
      function changeData(){
        if(data.flag){
          setData({...data, flag:0, text:"I'm React"})
        }
        else{
          setData({...data, flag:1, text:"Hi Prathmesh"})
        }
      }

  return (
    <>
    <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data.text}
        </p>
        
        <button className='btn btn-primary' onClick={changeData}>Click me</button>
    </header>
      
    </>
  )
}

export default ChangeText