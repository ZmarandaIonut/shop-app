const GetCartTotal = (state=0, action) => {
    switch(action.type){
       case "calculate_total" :
           return state + action.payload;
        case "get_total": 
           return state;
        case "edit_total":
           return state - action.payload.value;
         case "EMPTY_TOTAL" : return 0 // reset cart value
         default: 
           return state;
    }
}
export default GetCartTotal;