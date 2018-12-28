// let prevState = {data:1,allData:null};
//
// let newAction ={type:"INC",payload:{name:"Arushi",data:1}};
//
// const commonReducers = (state = prevState,action={type:"INC"}) => {
// switch(action.type){
//   case "INC" :{
//       console.log("here");
//       console.log(state.data.data+1);
//       break;
//   }
//   case "DEC" :{
//       console.log(state.a-1);
//       break;
//   }
//   return state;
//   }
// }

function commonReducers(state=0,action){
  if(action.type == "INC"){
    console.log(action.type)
  }
 switch(action.type){
   case "INC" :{
  console.log("")
   }
   case "DEC" :{

   }
 }
  return state
}

const reducers = {
  commonReducers : commonReducers
}

export default reducers;
