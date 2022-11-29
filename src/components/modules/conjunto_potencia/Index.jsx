import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../helpers/axios';

const Index = () => {
    const [resp, setResp] = useState("");

    useEffect(() => {
        handleRequest();
    }, []);

    const handleRequest = async() => {
        await axiosInstance.get('potencia')
            .then(resp => setResp(resp.data))
            .catch(err => console.log('error: ',err))
    };

    return (
        <div className='form'>
            <h1>{ resp !== undefined && resp }</h1>
        </div>
    )
}

export default Index
