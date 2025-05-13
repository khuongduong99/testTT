import axios from 'axios';


const fetchAllAlbums = () => {
    // call api
    return axios.get("https://jsonplaceholder.typicode.com/albums")
}

export { fetchAllAlbums }