import React,{ useState } from 'react'
import { useEffect } from 'react';
import { axiosInstance } from '../../../helpers/axios';
import './../../global/assets/css/styles.css';
import { validarCinta } from './helpers/cinta';

const EjerciciosOp = () => {

    const [ejercicio,setEjercicio] = useState({c1:"",c2:"",operador:""})
    const [respuesta,setRespuesta] = useState("")
    const [resultado,setResultado] = useState(undefined)

    useEffect(()=>{
        handleRequest()
    },[])

    useEffect(()=>{
        generarEjercicio()
    },[ejercicio])

    const handleRequest = async() => {
        await axiosInstance.get('operaciones/ejercicio/random/')
        .then(resp => {
            setEjercicio(resp.data)
        })
        .catch(err => console.log('error: ',err))
    }

    const generarEjercicio = () =>{        
        document.getElementById("ejercicio").textContent = ejercicio.operador === 773 ? "Dados el conjunto Universal " : "Dados los conjuntos "
        let conjunto1 = document.createElement('span')
        conjunto1.textContent = ejercicio.operador === 773 ? "U="+ejercicio.c1 : "A="+ejercicio.c1 
        conjunto1.className = "text-bold"
        let text1 = document.createTextNode(" y el conjunto ")
        let conjunto2 = document.createElement('span')
        conjunto2.textContent = ejercicio.operador === 773 ? "A="+ejercicio.c2 : "B="+ejercicio.c2 
        conjunto2.className = "text-bold"
        let text2 = document.createTextNode(", calcule ")
        let operadorTxt = document.createElement('span')
        operadorTxt.textContent = ejercicio.operador === 773 ? ("A"+String.fromCharCode(ejercicio.operador)) : ("A "+String.fromCharCode(ejercicio.operador)+" B")
        operadorTxt.className = "text-bold"

        document.getElementById("ejercicio").appendChild(conjunto1)
        document.getElementById("ejercicio").append(text1)
        document.getElementById("ejercicio").appendChild(conjunto2)
        document.getElementById("ejercicio").append(text2)
        document.getElementById("ejercicio").appendChild(operadorTxt)
    }
    
    const calcular = async() =>{
        const urlOperaciones = { 8746:'union/', 8745:'interseccion/',45:'dif_rel/',916:'dif_sim/',773:'complemento/'}
        let data

        data = {
            c1 : ejercicio.c1, 
            c2 : ejercicio.c2,
            respuesta: respuesta
        }

        let resultContainer = document.getElementById("container-result").classList
        let resultInput = document.getElementById("resultado").classList
        await axiosInstance.post('operaciones/'+urlOperaciones[ejercicio.operador],data)
        .then(resp => {
            console.log(resp)
            setResultado(resp.data)
            if (resultContainer.contains("show")){
                resultContainer.remove("show")
            }
            if (resultInput.contains("txt-error")){
                resultInput.replace("txt-error","txt-success")
            }
            if (resultInput.contains("input-error")){
                resultInput.replace("input-error","input-success")
            }
        })
        .catch(err => {
            console.log('error: ', err.response.data)
            setResultado("Respuesta correcta: " + err.response.data)
            resultInput.add("txt-error")
                resultInput.add("input-error")
                if(resultContainer.contains("show")){
                    resultContainer.remove("show")
                }
        })
    }

    const generar_otro = () =>{
        handleRequest()
        generarEjercicio()
        setRespuesta("")
        document.getElementById("respuesta").value = ""
        let resultContainer = document.getElementById("container-result").classList
        resultContainer.add("show")
    }

    const onSubmit = (e) => {
        e.preventDefault()
        calcular()
    }

    return (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <form className='mt-5 row justify-content-center' onSubmit={onSubmit} id="form">
                <div className='col-lg-12 mb-3'>
                    <label className="form-label text-bold">Ejercicio: </label>
                    <p className='text-regular' id="ejercicio"></p>
                </div>
                <div className='col mb-3'>
                    <label className="form-label text-bold">Respuesta: </label>
                    <input type="text" className="form-control rounded-3 text-regular" id="respuesta" onChange={(e) => validarCinta({el:e,setEl:setRespuesta})} onBlur={(e) => validarCinta({el:e,setEl:setRespuesta})}/>
                    <p className='text-m-22 txt-error' id="msg-respuesta"></p>
                </div>
                <div className='col-lg-6 mb-3 align-self-end'>
                    <button className="btn btn-primary btn-submit text-bold mb-3 rounded-3" id="btn-calcular">Calcular</button>
                </div>
            </form>
            <div className='container show' id="container-result">
                <input className="form-control rounded-3 text-bold txt-error input-error mb-3" id="resultado" disabled value={resultado}/>
                <button className="btn btn-primary btn-submit text-bold mb-3 rounded-3" id="btn-generar" onClick={() => generar_otro()}>Generar otro ejercicio</button>
            </div>
        </div>
    )
}

export default EjerciciosOp