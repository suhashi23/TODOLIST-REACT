import React, { useEffect, useState } from 'react';
import "./style.css";

//get localstorage data back
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");

    if(lists) {
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}


const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //add item function
    const addItems = () => {
        if (!inputdata) {
            alert("Please fill the data");
        } else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem){
                        return{ ...curElem, name: inputdata};
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
          } else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
          setItems([...items, myNewInputData]);
          setInputData("");
        };
    };

    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    // how to delete items
        const deleteItem = (index) => {
            const updatedItem = items.filter((curElem) => {
                return curElem.id != index;
            });
            setItems(updatedItem);
        };

    // remove all the elements
        const removeAll = () => {
            setItems([]);
            setInputData("");
        };

    //adding localstorage
        useEffect(() => {
            localStorage.setItem("mytodolist", JSON.stringify(items));
        }, [items]);
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.png" alt="todologo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="✍    Add Item"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)} 
                        />
                        {toggleButton ? (
                          <i className="fas fa-edit add-btn" onClick={addItems}></i>
                        ) : (
                          <i className="fa fa-plus add-btn" onClick={addItems}></i>
                        )}
                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit"
                                        onClick={() => editItem(curElem.id)} ></i>
                                        <i className="fas fa-trash-alt" 
                                        onClick={() => deleteItem(curElem.id)} ></i>
                                    </div>
                                </div>
                            );
                        })};

                    </div>

                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" 
                        data-sm-link-text="Remove All"
                        onClick={removeAll} >
                            <span> CHECK LIST </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
