const SearchDir = (state="", action) => {
   switch(action.type){
      case "edit" : return action.payload;
      default: return state;
   }
}
export default SearchDir