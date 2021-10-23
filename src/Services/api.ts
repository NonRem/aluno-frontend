import axios from "axios";

const api = axios.create({
    baseURL : "https://back-end-aluno.herokuapp.com"
});

export default api