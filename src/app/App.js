import React,{useState,useEffect} from 'react';
import ListTareas from './components/ListTareas';
import Navbar from './components/Navbar';
import Actualizar from './components/ActualizarTareas';
import { BrowserRouter,Route,Routes,Redirect} from 'react-router-dom';

const App = ()=>{
    const [tarea,setTarea] = useState('')
    const [descrpcion,setDescripcion] = useState('')
    const [data,setData] = useState([])
    const [id,setID] = useState('')


    function addTask(e){
        e.preventDefault()
        if(id!==''){
            console.log(tarea,descrpcion,id)
            fetch(`/api/crud/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  title: tarea,
                  description: descrpcion
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(data => {
                M.toast({html: 'Task Updated'});
                setTarea('')
                setDescripcion('')
                setID('')
                })
        }else{

            fetch('/api/crud',
            {
                method:'POST',
                body:JSON.stringify({title:tarea,description:descrpcion}),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res=>res.json())
                .then(data=>{
                    console.group(data)
                    M.toast({html:'Task Saved'});
                    setTarea('')
                    setDescripcion('') 
                    })
                .catch(err => console.log(err))
        }
    }

    function editTask(id) {
        fetch(`/api/crud/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setTarea( data.title)
            setDescripcion( data.description)
            setID(id)
          });
      }

    function deleteZ(id){
        if(confirm('Estas seguro de eliminar esto?')){
            fetch(`/api/crud/${id}`, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  M.toast({html: 'Task deleted'});
                  this.fetchTasks();
                });
            console.log('Hola',id)
            setID('')
        }
   } 


    function fecthTask (){
        fetch('/api/crud')
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)   
                setData(data.tasks)
            })
    }
    
    useEffect(() => {
       fecthTask()
    }, [id])

    return (
        <div>
            {/* Navegación*/}
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className="brand-logo" href="/"> Mern Stack</a>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={addTask}>
                                    <div className="row">
                                        <div className="input field col s12">
                                            <input type="text" 
                                                placeholder="Titulo"
                                                name="title"
                                                value={tarea}
                                                onChange={event=>{setTarea(event.target.value)}}
                                            />
                                        </div>
                                        <div className="input field col s12">
                                            <textarea placeholder="Descripción de tarea"
                                                name="description"
                                                value={descrpcion}
                                                className="materialize-textarea"
                                                onChange={event=>{setDescripcion(event.target.value)}}

                                            ></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4" >
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s5">
                    </div>
                    <div className="col s7">
                    <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(task=>{
                            return(
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button onClick={()=>deleteZ(task._id)} className="btn light-blue darken-4">
                                        <i className="material-icons">delete</i> 
                                        </button>
                                        <button onClick={()=>editTask(task._id)}  className="btn light-blue darken-4" style={{margin: '4px'}}>
                                        <i className="material-icons">edit</i>
                                        </button>
                                    </td>
                                </tr>
                            )                            
                        })
                    }
                </tbody>
            </table>
                    </div>
                </div>
            </div>
        </div>
      );
 }
export default App;