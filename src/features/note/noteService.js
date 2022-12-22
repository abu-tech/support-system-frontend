import axios from "axios"
const API_URL = `${process.env.REACT_APP_APP_URL}/api/tickets`

const getAll = async (ticketId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    // eslint-disable-next-line
    const response = await axios.get(API_URL + `/${ticketId}` + "/notes", config)

    return response.data
}

const create = async (ticketId, noteData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    // eslint-disable-next-line
    const response = await axios.post(API_URL + `/${ticketId}` + "/notes", {text: noteData}, config)

    return response.data
}

const noteService = {
    getAll,
    create
}

export default noteService