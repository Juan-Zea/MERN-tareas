import React,{useState} from 'react';

const App = () => {

    const [afjalkdf]

    function addTask(e){
        console.log('adding task')
        e.preventDefault()
    }

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
                                            />
                                        </div>
                                        <div className="input field col s12">
                                            <textarea placeholder="Descripción de tarea"
                                                className="materialize-textarea"
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
                        
                    </div>
                </div>
            </div>
        </div>
      );
}
 
export default App;