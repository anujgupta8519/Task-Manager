import apiClient from "../utils/RefreshAccess.utils";

const createTaskService = ({title, description, priority, assignedTo}) => {
    return new Promise((resolve, reject) => {
       
        apiClient.post('/api/task/', {title, description, priority, assignedTo})
        .then((res) => {
       
            resolve(res); 
        }).catch((err) => {
            reject(parseData(err)); 
        });
    });
}

export {createTaskService}