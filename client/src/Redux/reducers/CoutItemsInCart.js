const CountItemsInCart = (state=0, action) => {
     switch(action.type){
        case "ADD" :
          return action.payload ? state + action.payload : state + 1;
        case "REMOVE" : 
          return state - action.payload.quantity;
        case "CLEAR" : return 0;
        default: 
          return state;
     }
}
export default CountItemsInCart;