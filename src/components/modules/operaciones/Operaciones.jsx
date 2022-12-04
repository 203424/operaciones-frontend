import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../helpers/axios';
import { validarCinta } from './helpers/cinta';
import './../../global/assets/css/styles.css';

const Operaciones = () => {
    const [resultado, setResultado] = useState(undefined);
    const [cinta1, setCinta1] = useState('')
    const [cinta2, setCinta2] = useState('')
    const [operador, setOperador] = useState('-1')

    useEffect(()=>{
        if (cinta1 === "" || cinta2 === "" || operador === "-1" || operador === null){
            document.getElementById("btn-calcular").disabled = true
        }else{
            document.getElementById("btn-calcular").disabled = false
        }
    },[cinta1,cinta2,operador]);

    const calcular = async() => { //Función para hacer las peticiones a la api
        let data
        const urlOperaciones = ['union/','interseccion/','dif_rel/','dif_sim/','complemento/']
        
        if (operador === 0){
            data = {
                c1 : cinta1+'#'+cinta2,
                c2 : ""
            }  
        }else{
            data = {
                c1 : cinta1,
                c2 : cinta2,
            }
        }
        await axiosInstance.post('operaciones/'+urlOperaciones[operador],data)
            .then(resp => {
                console.log(resp)
                setResultado(resp.data)
            })
            .catch(err => console.log('error: ', err))
    };

    const validarOperacion = (e) => { //Valida que se haya seleccionado una operacion del select
        if (e.target.value != "-1"){
            setOperador(parseInt(e.target.value))
            document.getElementById("msg-opr").textContent = ""
        }else{
            setOperador(null)
            document.getElementById("msg-opr").textContent = "Selecciona una operación válida"
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        calcular()
    }

    return (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <form onSubmit={onSubmit}>
                <div className='container mb-3'>
                    <div className='row'>
                        <div className="mb-3">
                            {operador === 4 ? <label className="form-label text-bold">Universo</label> : <label className="form-label text-bold">Conjunto A</label>}
                            <input type="text" className="form-control rounded-3 text-regular" id="cinta1" onChange={(e) => validarCinta({el:e,setEl:setCinta1})} onBlur={(e) => validarCinta({el:e,setEl:setCinta1})} />
                            <p className='text-m-22 txt-error' id="msg-cinta1"></p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="mb-3">
                            {operador === 4 ? <label className="form-label text-bold">Conjunto A</label> : <label className="form-label text-bold">Conjunto B</label>}
                            <input type="text" className="form-control rounded-3 text-regular" id="cinta2" onChange={(e) => validarCinta({el:e,setEl:setCinta2})} onBlur={(e) => validarCinta({el:e,setEl:setCinta2})} />
                            <p className='text-m-22 txt-error' id="msg-cinta2"></p>
                        </div>
                    </div>
                    <div className='row mb-3 align-items-end'>
                        <div className='col-md-6'>
                            <label className="form-label text-bold">Operación</label>
                            <select defaultValue={"-1"} className="form-select form-select-md text-regular rounded-3" onChange={(e) => validarOperacion(e)} onBlur={(e) => validarOperacion(e)}>
                                <option value="-1">Selecciona una operación</option>
                                <option value="0">Unión</option>
                                <option value="1">Intersección</option>
                                <option value="2">Diferencia relativa</option>
                                <option value="3">Diferencia simétrica</option>
                                <option value="4">Complemento</option>
                            </select>
                            <p className='text-m-22 txt-error' id="msg-opr"></p>
                        </div>
                        <div className='col-md-6'>
                            <button className="btn btn-primary btn-submit text-bold mb-3 rounded-3" id="btn-calcular">Calcular</button>
                        </div>
                    </div>
                </div>
            </form>
            {resultado !== undefined ?
                <div className='container mt-5'>
                <label className="form-label text-bold">Resultado: </label>
                <input className="form-control rounded-3 text-bold txt-success input-success" id="resultado" disabled value={resultado}/>
            </div> : <></>}
        </div>
    )
}

export default Operaciones