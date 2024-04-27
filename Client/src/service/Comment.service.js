import axios from "axios"

const CreateCommentService = ({taskId,comment}) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/comment/', {taskId,comment})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })
} 

const deleteCommentService = ({taskId,commentId}) => {
    return new Promise((resolve, reject) => {
        axios.delete('/api/comment/', {taskId,commentId})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })
}


export {CreateCommentService,deleteCommentService}