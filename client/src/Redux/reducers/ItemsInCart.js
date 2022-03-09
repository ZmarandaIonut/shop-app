const ItemsInCart = (state=[], action) => {
 if(action.type === "ADD_ITEM"){
   for(let i = 0; i<state.length; i++){
     if(state[i].productname === action.payload.productname){
        state[i].quantity += action.payload.quantity;
        return [...state];
     }
   }
   return [...state, action.payload];
 }
 else if(action.type === "REMOVE_ITEM"){
   const newData = state.filter(items => items.productname !== action.payload.removedItem);
   return newData;
 }
 else if(action.type === "REMOVE_ALL"){
   return [];
 }
 return state;
}
export default ItemsInCart