import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

// const getAll = () => {
//     const request = axios.get(baseUrl)
//     return request.then(response => response.data)
// }

// const create = newObject => {
//     const request = axios.post(baseUrl, newObject)
//     return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response.data)
// }

// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }

// export default {
//   getAll, 
//   create, 
//   update 
// }

const noteService = {
    getAll: () => {
        const request = axios.get(baseUrl)
        // const nonExisting = {
        //   id: 10000,
        //   content: 'This note is not saved to server',
        //   important: true,
        // }
        return request.then(response => response.data)
        // return request.then(response => response.data.concat(nonExisting))
    },

    create: newObject => {
        const request = axios.post(baseUrl, newObject)
        return request.then(response => response.data)
    },

    update: (id, newObject) => {
        const request = axios.put(`${baseUrl}/${id}`, newObject)
        return request.then(response => response.data)
    }
}

export default noteService

// const noteService = {
//     getAll: async () => {
//         const request = axios.get(baseUrl)
//         const response = await request
//         return response.data
//     },

//     create: async newObject => {
//         const request = axios.post(baseUrl, newObject)
//         const response = await request
//         return response.data
//     },

//     update: async (id, newObject) => {
//         const request = axios.put(`${baseUrl}/${id}`, newObject)
//         const response = await request
//         return response.data
//     }
// }

// export default noteService