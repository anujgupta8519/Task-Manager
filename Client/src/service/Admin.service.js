 import axios from 'axios'
import { parseData } from '../utils/Parsedata'

const loginServiceofAdmin =  ({username, password}) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/admin/login', {username, password})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })
 
    
}

const registerUser = ({name,email,role,mobileNumber}) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/admin/user', {name,email,role,mobileNumber})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })


}

const updateUser = ({role,mobileNumber}) => {

    return new Promise((resolve, reject) => {
        axios.patch('/api/admin/user', {role,mobileNumber})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })

}

const deleteUser = ({email}) => {

    return new Promise((resolve, reject) => {
        axios.delete('/api/admin/user', {email})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })
}

const logoutAdmin = () => {
    return new Promise((resolve, reject) => {
        axios.post('/api/admin/logout')
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })
}

const getAllUser = () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/users')
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })
    })
}


export {loginServiceofAdmin,registerUser,updateUser,deleteUser,logoutAdmin,getAllUser}