import { element } from "prop-types";
import React, { useState, useEffect } from "react";

let aux = [];
const url = "https://assets.breatheco.de/apis/fake/todos/user/elenak1345";

const ToDoList = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [done, setDone] = useState(false); // -> para saber cuando se ha completado

//al hacer click en borrar, la tarea pasa Done -> True y los que estan en True NO se muestran

  useEffect(() => {
    getList();
  }, []);

  // creamos usuario
  const createUser = async () => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok)     //comprobamos si han habido errores
          throw new Error("Usuario ya creado anteriormente"); //creamos un objeto de tipo Error
        return resp.json();
      })
      .then((data) => {
        getList();
      })
      .catch((error) => {
        //imprimimos el mensaje del error
        console.log(error);
      });
  };

  const getList = async () => {
    await fetch(url) //descargamos la lista
      .then(
        (resp) => resp.json() //si no ha habido error decodificamos el codigo
      )
      .then((data) => {
        console.log(data);
        setTask([...data]);
      })
      .catch((error) => {
        console.log(error);
        createUser();
      });
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const addTask = () => {
    if (text.length > 0) {
      let taskObj = {
        label: text,
        done: false,
      };
      setTask([...task, taskObj]);
      console.log(task);
      setText("");
      uploadList();
    }
  };

  const loader = (data) => {
    return data.map((item, index) => (
      <div key={index}>
        <li className="list-group-item d-flex py-2 rounded">
          <div className="d-flex w-100">{item.label}</div>
          <div>
            <button
              className="delete-button btn"
              onClick={() => {
                let aux = task.filter(
                  (element, index) => element.id != item.id
                );
                setTask([...aux]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </button>
          </div>
        </li>
      </div>
    ));
  };

  const uploadList = async () =>{
    await fetch(url,{
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response=>{
      if(!response.ok)
        throw new Error('El PUT ha fallado')     //throw corta la ejecución de la función. 
      return response.json()             // new: para crear/instanciar objetos de una clase(se llama el constructor de una clase)
    })
    .then(data=>{
      // getList()
    })
    .catch(error=>{
      console.log('error')
      createUser();
      uploadList();
    })

  }
  // const renderList = (item, index) => {
  //     return (
  //         <div key={index}>
  //             <li className="list-group-item d-flex py-2 rounded">
  //                 <div className="d-flex w-100">{item.label}</div>
  //                 <div>
  //                     <button className="delete-button btn" onClick={()=> {
  //                         let aux = task.filter((element,index) => element.id != item.id)
  //                         setTask([...aux])
  //                     }}>
  //                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  //                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
  //                         </svg>
  //                     </button>
  //                 </div>
  //             </li>
  //         </div>)
  // }
  return (
    <div className="col-9">
      <div className="mb-5 d-flex">
        {/* <label htmlFor='textInput' className="form-label"></label> */}
        <input
          type="text"
          value={text}
          className="input form-control text-center py-3"
          id="textInput"
          placeholder="What needs to be done?"
          onChange={handleText}
          onKeyUp={(e) => e.keyCode == 13 && addTask()}
        />
        {/* <button className='btn btn-outline-danger d-flex' onClick={addTask}>Buscar</button> */}
      </div>
      {/* {task.map(renderList)} */}
      {task.length != 0 ? (
        <div className="label">
          <label>{task.length} item left</label>
        </div>
      ) : (
        <div className="no-task">No pending task</div>
        )}
        {loader(task)}
    </div>
  );
};

export default ToDoList;
