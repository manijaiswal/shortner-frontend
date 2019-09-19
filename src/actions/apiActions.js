import axios from 'axios';

export const postData= (userData,url) => async dispatch=>{
    const reqOptions = {
        method:'POST',
        url:url,
        data:JSON.stringify(userData),
        headers:{
            'Content-Type': 'application/json'
        }
    };
    return axios(reqOptions)
    .then((res)=>{
        console.log(res);
        return Promise.resolve(res.data);
    })
    .catch((error)=>{
        console.log(error.response);
        return Promise.reject(error);
    })
};

export const fetchFunction = (userData,url) => async dispatch=>{
    const reqOptions = {
        method:'GET',
        url:url,
        params:userData,
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return axios(reqOptions)
    .then((res)=>{
        console.log(res);
        return Promise.resolve(res.data);
    })
    .catch((error)=>{
        console.log(error.response);
        return Promise.reject(error);
    })
};