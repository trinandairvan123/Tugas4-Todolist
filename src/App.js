/** Libs */
import { useState } from 'react';

/** Assets */
import './App.css';

export default function App() {
  // State
  const [activity, activitySet] = useState("")
  const [index, indexSet] = useState(0)
  const [Complete, CompleteSet] = useState(false)
  const [listactivitys, listactivitysSet] = useState([]);

  // Handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (activity === "") {
      alert("Wajib Diisi")
    } else {
      console.log(`activitys: ${activity}, index: ${index}, completed: ${Complete}`);
      CompleteSet(false)
      indexSet((prev) => prev + 1)
      listactivitysSet((prev) => [...prev, { activity, index, Complete }])
      activitySet("")
    }
  }
  const editHandler = (value) => {
    activitySet(value.activity)
    listactivitysSet((prev) => [...prev].filter((e) => e.index !== value.index))
  }
  const deleteHandler = (value) => {
    listactivitysSet((prev) => [...prev].filter((e) => e.index !== value.index))
  }
  const checkCompleteHandler = (value) => {
    const newState = listactivitys.map(prev =>
      prev.index === value.index ? { ...prev, Complete: !value.Complete } : prev
    )
    listactivitysSet(newState)
  }


  return (
    <div className="App">
      <h1>TODOS</h1>
      <form onSubmit={onSubmitHandler}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <input style={{ width: '500px' }} type={'text'} placeholder='Add todo...' value={activity} onChange={(e) => activitySet(e.target.value)} />
          <button type='submit'>Submit</button>
        </div>
      </form>
      <div>
        {listactivitys.map((el) => (
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }} key={el.index}>
            <input value={el.Complete} type={'checkbox'} onClick={() => checkCompleteHandler(el)}></input>
            <div style={el.Complete ? { textDecoration: 'line-through' } : null}>{el.activity}</div>
            <button onClick={() => { deleteHandler(el) }}>Delete</button>
            <button onClick={() => { editHandler(el) }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
