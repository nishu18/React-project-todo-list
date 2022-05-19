import React, { useState , useEffect} from "react";
import "./style.css"

const getLocalData=()=>{
    const lists =localStorage.getItem("mytodolist")

    if(lists){
        return JSON.parse(lists);
    }else{
        return[];
    }
};
const Todo=()=>{
    const [inputdata, setInputData]=useState("");
    const [items, setItems]=useState(getLocalData());

    //add item
    const addItem=()=>{
        if(!inputdata){
            alert("plz fill the data");
        }else{
            const myNewInputData={
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };
    // how to delete item

    const deleteItem=(index)=>{
        const updatedItems=items.filter((curElem)=>{
            return curElem.id!==index;
        });
        setItems(updatedItems);
    };
    
    //remove all item
    const removeAll=()=>{
        setItems([]);
    };
    
    // local storage

    useEffect(()=>{
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items])
    
    return(
        <div>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo"  />
                        <figcaption>Add your list here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text "  placeholder="✍ Add Items" className="form-control" 
                         value={inputdata}
                         onChange={(event)=>setInputData(event.target.value)}/>
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    </div>
                    {/* show item */}
                    <div className="showItem">
                        {items.map((curElem)=>{
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h2>{curElem.name}</h2>
                                    <div className="todo-btn">
                                    {/* <i className="far fa-edit add-btn" onClick={}></i> */}
                                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                                </div>
                                </div>

                            );
                        })};
                    </div>

                    {/* remove button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                        onClick={removeAll}
                        ><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Todo;