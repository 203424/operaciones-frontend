import React,{ useState } from 'react'
import { useEffect } from 'react';
import { axiosInstance } from '../../../helpers/axios';
import './../../global/assets/css/styles.css';
import { validarCinta } from './helpers/cinta';

const EjerciciosOp = () => {

    const [ejercicio,setEjercicio] = useState(undefined)
    const [respuesta,setRespuesta] = useState("")

    useEffect(()=>{
        handleRequest()
    },[])

    let txt_ejercicio_conjuntos = ''

    const handleRequest = async() => {
        await axiosInstance.get('operaciones/ejercicio/')
        .then(resp => {
            setEjercicio(resp.data)
            document.getElementById("form").style = "display:none"
        })
        .catch(err => console.log('error: ',err))
    }

    const generarEjercicio = () =>{
        if (ejercicio.operacion === "complemento"){
            txt_ejercicio_conjuntos = "Dados el conjunto Universal U="+ejercicio.c1+" y el conjunto A="+ejercicio.c2+", calcula el valor de A'"
        }else{
            txt_ejercicio_conjuntos = "Dados dos conjuntos A="+ejercicio.c1+" y B="+ejercicio.c2+", calcule la "+ejercicio.operacion 
        }
        document.getElementById("ejercicio").value = txt_ejercicio_conjuntos
        document.getElementById("form").style = "display:default"
        console.log(txt_ejercicio_conjuntos);
    }

    const calcular = async() =>{
        let data

        data = {
            c1 : ejercicio.c1, 
            c2 : ejercicio.c2,
            respuesta: respuesta
        }

        await axiosInstance.post('operaciones/'+ejercicio.operacion+"/",data)
        .then(resp => {
            console.log(resp)
        })
        .catch(err => console.log('error: ', err))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        calcular()
    }

    return (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <button className="btn btn-primary btn-submit text-bold mb-3 rounded-3" id="btn-calcular" onClick={() => generarEjercicio()}>Generar Ejercicio</button>
            {ejercicio !== "" ?
                <form className='mt-5 row justify-content-center' onSubmit={onSubmit} id="form">
                    <div className='col-lg-12 mb-3'>
                        <label className="form-label text-bold">Ejercicio: </label>
                        <input className="form-control rounded-3 text-bold" id="ejercicio" disabled/>
                    </div>
                    <div className='col mb-3'>
                        <label className="form-label text-bold">Respuesta: </label>
                        <input type="text" className="form-control rounded-3 text-regular" id="respuesta" onChange={(e) => validarCinta({el:e,setEl:setRespuesta})} onBlur={(e) => validarCinta({el:e,setEl:setRespuesta})}/>
                        <p className='text-m-22 txt-error' id="msg-respuesta"></p>
                    </div>
                    <div className='col-lg-6 mb-3 align-self-end'>
                        <button className="btn btn-primary btn-submit text-bold mb-3 rounded-3" id="btn-calcular">Calcular</button>
                    </div>
                </form> :
            <></>}
        </div>
    )
}

export default EjerciciosOp