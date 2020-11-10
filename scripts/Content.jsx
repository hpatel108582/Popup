import  React, { useState } from 'react';
import Modal from 'react-modal';
import TimePicker from 'rc-time-picker';
import ReactDOM from 'react-dom';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { Socket } from './Socket';


export function Content() {
    const [modal, setModal] = React.useState(0);
    const format = 'h:mm a';
    const [sTime, setSTime] = useState('')
    const [eTime, setETime] = useState('')
    const [state,setState] = React.useState(
        {
            title: '',
        
        }
    )
    const now = moment().hour(0).minute(0);

function onSChange(value) {
 
  console.log(value.format(format));
  setSTime(value.format(format))
  
  Socket.emit('output', {
        'title': 'yo',
    });
} 

function onEChange(value) {
  console.log(value && value.format(format));
  setETime( value.format(format))
}
    
    
    function handleChange(evt) {
  const value = evt.target.value;
  setState({
    ...state,
    [evt.target.name]: value
  });
}

  const onMessageSubmit = (e) => {
      e.preventDefault()
      const {title } =state
     
      
      
    }
    
   

    return (
        <div>
            <button onClick={()=> setModal(true)}> Open Modal </button> 
            <Modal  
                isOpen={modal}
                onRequestClose={()=>setModal(false)}
            >
            
          <form onSubmit={onMessageSubmit}>
      
        <h1>Add Event</h1>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        />
      
     
        
        <h3> Start Time </h3>
            <TimePicker 
                showSecond={false}
                defaultValue={now}
                className="xxx"
                onChange={onSChange}
                format={format}
                use12Hours
                inputReadOnly
            /> 
            <h3> End  Time </h3>
            <TimePicker 
                showSecond={false}
                defaultValue={now}
                className="xxx"
        
                onChange={onEChange}
                format={format}
                use12Hours
                inputReadOnly
            /> 
      <button type="submit" onClick={()=> setModal(false)}>Send Event </button>
    </form>
    
   
            </Modal>
        <p> {state.title} </p>
        <p> {sTime} </p> 
        <p> {eTime} </p>
        </div>
    );
}