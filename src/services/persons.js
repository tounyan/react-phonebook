import axios from 'axios'

const baseUrl = 'api/persons'

const getAll = () => {
    let request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    let request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    let request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    let request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }