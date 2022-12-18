const express=require('express');
const app=express();

app.use(express.json());
app.use(require('body-parser').urlencoded({ extended: false }));

var subSetSum = function(input, sum) {

    let y = input.length;
    let x = sum;

    if(input.length === 0) return 0;

    let d = [];

    //fill the rows
    for (let i = 0; i <= y; i++) {
      d[i] = [];
      d[i][0] = true;
    }
    
    for (let j = 1; j <= y; j++) { //j row
      for (let i = 1; i <= x; i++) { //i column
      let num = input[j-1];
        if(num === i) {
          d[j][i] = true;
        } else if(d[j-1][i]) {
          d[j][i] = true;
        } else if (d[j-1][i-num]) {
          d[j][i] = true;
        }
      }
    }
    
    //console.table(d); //uncomment to see the table
    if(!d[y][x]) return null;

    let searchedSet = [];
    for(let j=input.length, i=sum; j>0 && i != 0; j--) {
      if(input[j-1] !== i) {
        while(d[j-1][i]) { // go up
          j--;
        }
      }
      searchedSet.push(input[j-1]);
      i = i-input[j-1];
    }

    return searchedSet;
};


app.get("/api",(req,res)=>{
    res.json({"users":["user1","user2"]});
})

app.post("/api",(req,res)=>{
    const {num, list}=req.body;
    console.log(list)
    if(!num || isNaN(num)){
        return res.json({msg:"Invalid input"});
    }
    else{
        // const list=[12,1,61,5,9,2];
        return res.json({msg:"Successful", data:subSetSum(list,num)});
    }
})

app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})