import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./App.css"



function App() {
  const [todo, setTodo] = useState("");
  const[todos,setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const confirm =(e) => {
    alert(`Are You sure you Want to delete it`)
  }
  const saveToLS = ((params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  })
  const handleEdit=(e,id)=>{
    let t = todos.filter(i=> i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !==id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete=(e,id)=>{
    confirm(e);
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !==id;
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd=()=>{
    setTodos([...todos, {id: uuidv4(),todo, isCompleted : false}])
    setTodo("")
    // console.log([todos]);
    saveToLS()

  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleChecbox = (e) => { 
    let id= e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  
  
  return (
    <div className=' bg-blue-50'>
      <Navbar />
      <div className="mx-3 flex-grow overflow-auto md:container md:mx-auto my-5 rounded-xl p-5  text-gray-900 md:w-1/2 min-h-screen py-12 bg-violet-50">
       <h1 className=' font-bold text-4xl text-center'> iTask : Manage Your Todos At One Place</h1>
        <div className="addTodo flex flex-col my-5 gap-4">
          <h2 className="text-2xl font-semibold">Add a Todo</h2>
          <input  onChange={handleChange} value={todo} type="text"  className='rounded-full input-field px-5 py-2 w-full' placeholder='Write your plan here'/>
          <button disabled = {todo.length <= 3} onClick={handleAdd} className="rounded-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 mx-4 disabled:bg-violet-400">Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked = {showFinished} /> Show Finished
        <div className='h-[2px] bg-black opacity-80 w-90% my-5 mx-auto'></div>
        <h2 className='text-2xl font-semibold'>Your Todo's</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'> No Todo's To Display </div>}
          {todos.map((item) =>{
            
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between" >
              <div className="flex gap-5 m-5">
                <input name={item.id} onChange={handleChecbox} type="checkbox" checked={item.isCompleted}  />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 mx-4"><FaEdit />
                </button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 mx-4"><MdDelete /></button>
              </div>
          </div>
          })}
        </div>





      </div>
    

    </div>
  )
}

export default App
