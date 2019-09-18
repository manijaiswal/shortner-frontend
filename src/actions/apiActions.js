import axios from 'axios';
import Cookies from 'js-cookie';

export const postData= (userData,url) => async dispatch=>{
    var cookieData = Cookies.getJSON('COOKIE_AUTH');
    var token = '';
    if(Object.keys(cookieData).length!=0){
        token = cookieData['token'];
    }
    const reqOptions = {
        method:'POST',
        url:url,
        data:JSON.stringify(userData),
        headers:{
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    return axios(reqOptions)
    .then((res)=>{
        console.log(res);
        return Promise.resolve(res.data);
    })
    .catch((error)=>{
        console.log(error.response);
        if(Object.keys(error.response.data).length!=0){
            if(error.response.data.code===850){
                Cookies.remove('COOKIE_AUTH')
                window.location.reload();
            }
        }
        return Promise.reject(error);
    })
};