import { createStore, combineReducers } from 'redux';
import reducers from './reducers/reducer.js';

const store = createStore(combineReducers(reducers));

store.subscribe(()=> {
    console.log('Store updated: ', store.getState());
})

 store.dispatch({data:{name:"Arushi",data:1}, type:"INC"})
// store.dispatch({type:"DEC",payload:{name:"Arushi",data:1}})

export default store;
