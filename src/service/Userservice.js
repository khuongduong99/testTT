import axios from 'axios';


const fetchAllUser = () => {
    // call api
    return axios.get("https://jsonplaceholder.typicode.com/users")
}

export { fetchAllUser }