import React,{useEffect,useState} from 'react';



const ListTareas = () => {
    
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
        }
   } 

    const [data,setData] = useState([])

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
    }, [data])
    
    // let {tasks}=data
    return ( 
        <div>
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
                                        <button  className="btn light-blue darken-4" style={{margin: '4px'}}>
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
     );
}
 
export default ListTareas;