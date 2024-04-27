import axios from 'axios'
import apiClient from '../utils/RefreshAccess.utils'
import { parseData } from '../utils/Parsedata'

const generateOTPService = ({email}) => {
    return new Promise((resolve, reject) => {
        // Using POST request and sending email in the body
        axios.post('/api/user/genrateOTP', {email})
        .then((res) => {
            // Assuming 'data' is part of the response and contains the desired information
            resolve(res); // Resolving with `res.data`
        }).catch((err) => {
            reject(parseData(err)); // Ensure parseData is a defined function that parses the error
        });
    });
}

const loginWithPasswordService = ({email, password}) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/user/login-with-password', {email, password})
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })  

}

const setPasswordService = ({ email, otp, password, confirmPassword }) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/user/set-password', { email, otp, password, confirmPassword })
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })
}

const loginWithOTPService = ({ email, otp }) => {

    return new Promise((resolve, reject) => {
        axios.post('/api/user/login-with-otp', { email, otp })
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })

}

const logoutUserService = () => {

    return new Promise((resolve, reject) => {
        axios.post('/api/user/logout')
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })
}

const updatePasswordService = ({password, confirmPassword }) => {
    
    return new Promise((resolve, reject) => {
        apiClient.patch('/api/user/update-password', { password, confirmPassword })
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
    
           
            reject(parseData(err))
        })

    })
}



const getcreatedTaskService = () => {

    return new Promise((resolve, reject) => {
        apiClient.get('/api/user/getcreatedTask')
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })

}

const getAssigntomeTaskService = () => {

    return new Promise((resolve, reject) => {
        apiClient.get('/api/user/getAssigntomeTask')
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })

}

const getCurrentUserService = () => {

    return new Promise((resolve, reject) => {
        apiClient.get('/api/user/getCurrentUser')
        .then((res) => {    
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })
}

// const refreshAccessTokenService = () => {

//     return new Promise((resolve, reject) => {
//         apiClient.get('/api/user/refresh-access-token')
//         .then((res) => {
//             resolve(res.data.data)
//         }).catch((err) => {
//             reject(parseData(err))
//         })

//     })

// }


const getAllDevelopersService = () => {

    return new Promise((resolve, reject) => {
        apiClient.get('/api/user/getAllDeveloper')
        .then((res) => {
            resolve(res.data.data)
        }).catch((err) => {
            reject(parseData(err))
        })

    })
}




export {
    generateOTPService,
    loginWithPasswordService,
    setPasswordService,
    loginWithOTPService,
    updatePasswordService,
    logoutUserService,
    getcreatedTaskService,
    getAssigntomeTaskService,
    getCurrentUserService,
    getAllDevelopersService
}

