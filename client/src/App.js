import { useState } from "react";

function App() {
  const [inputValue, setInputValue]=useState("");
  const [gotListValues,setGotListValues]=useState(false);
  const [listItems,setListItems]=useState([]);
  const [inputChange,setInputChange]=useState(true);
  const [inputListValue,setInputListValue]=useState(""); 
  const inputChangeHandler=(e)=>{
    setInputChange(true);
    setInputValue(e.target.value);
  }

  const inputListChangeHandler=(e)=>{
    // console.log(e.target.value)
    setInputChange(true);
    setInputListValue(e.target.value);
    //  console.log(e.target.value)
  }

  function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
  
    const num = Number(str);
  
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
  
    return false;
  }

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    setInputChange(false);



    if(!isPositiveInteger(inputValue))return;
    

    const list = inputListValue.split(',');

    let newList = [];

    //fill the rows
    for (let i = 0; i < list.length; i++) {
      newList.push(parseInt(list[i]));
    }

    const myData={
      num:parseInt(inputValue),
      list:newList
    };

console.log(newList)

    const submitData=async()=>{
      const result=await fetch('/api',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(myData)
      })

      const resultToJSON=await result.json();
      if(resultToJSON.data && resultToJSON.data.length!==0){
        setGotListValues(true);
        setListItems(resultToJSON.data);
      }
      else {
        setGotListValues(false);
      }
    }

    submitData();
    
  }

  const uList=<ul className="check-list">
    {listItems.map((listItem,id)=>{
      return <li key={id}>{listItem}</li>
    })}
  </ul>;

  return (
    <div className="login-box">
      <h2>Play</h2>
      <form onSubmit={onSubmitHandler}>

        <div className="user-box">
          <input type="text" name="" required="" onChange={inputListChangeHandler} value={inputListValue}/>
          <label>Input_List</label>
        </div>

        <div className="user-box">
          <input type="text" name="" required="" onChange={inputChangeHandler} value={inputValue}/>
          <label>Target Number</label>
        </div>
        <a onClick={onSubmitHandler}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>

      </form>
      {inputChange?<p className="invalid">Submit to see changes</p>:gotListValues?uList:<p className="invalid">Subset can not be formed</p>}
    </div>
    
  );
}

export default App;
