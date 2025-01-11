import axios from "axios";

const SetLogin=(data)=>{
if(data){
    axios.defaults.headers.common['Authorization']=data
}
else{
    delete axios.defaults.headers.common['Authorization']
}
}
export default SetLogin