const MinMaxFilter = (state=[0,Infinity], action) => {
     if(action.type === "setMinMax"){
         return [action.min, action.max];
     }
     else{
         return state;
     }
}
export default MinMaxFilter;