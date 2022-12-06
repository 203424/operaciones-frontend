import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../helpers/axios';
import { validarCinta } from './helpers/cinta';
import './../../global/assets/css/styles.css';

const Operaciones = () => {
    const [interfaz, setInterfaz] = useState("0")
    const [resultado, setResultado] = useState(undefined);
    const [cinta, setCinta] = useState('')
    const [cinta1, setCinta1] = useState('')
    const [cinta2, setCinta2] = useState('')
    const [operador, setOperador] = useState('-1')

    useEffect(()=>{
        if (cinta1 === "" || cinta2 === "" || operador === "-1" || operador === null){
            document.getElementById("btn-calcular").disabled = true
            document.getElementById("container-result").classList.add("show")
        }else{
            document.getElementById("btn-calcular").disabled = false
        }
    },[cinta1,cinta2,operador]);
    
    const calcular = async() => { //Función para hacer las peticiones a la api
        let data
        const urlOperaciones = ['union/','interseccion/','dif_rel/','dif_sim/','complemento/']
        const operadorSim = [8746,8745,45,916,773]
        data = {
            c1 : cinta1,
            c2 : cinta2,
        }
        let resultadoInput = document.getElementById("resultado").classList
        let resultadoDiv = document.getElementById("container-result").classList
        await axiosInstance.post('operaciones/'+urlOperaciones[operador],data)
        .then(resp => {
                console.log(resp.data)
                let aux = operador === 4 ? ("A"+ String.fromCharCode(operadorSim[operador]) +" = ") : ("A " + String.fromCharCode(operadorSim[operador]) + " B = ")
                setResultado(aux + resp.data)
                if(resultadoDiv.contains("show")){
                    resultadoDiv.remove("show")
                }
                if(resultadoInput.contains("txt-error")){
                    resultadoInput.replace("txt-error","txt-success")
                }else{
                    resultadoInput.add("txt-success")
                }
                if(resultadoInput.contains("input-error")){
                    resultadoInput.replace("input-error","input-success")
                }else{
                    resultadoInput.add("input-success")
                }

            })
            .catch(err => {
                console.log('error: ', err)
                setResultado("El conjunto A contiene elementos que no forman parte del universo")
                resultadoInput.add("txt-error")
                resultadoInput.add("input-error")
                if(resultadoDiv.contains("show")){
                    resultadoDiv.remove("show")
                }
            })
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
    
    const validarEntrada = (e) => {
        let operacionesString = ["/U","/I","/DR","/DS","/C"]
        const expReg = /^\s*{(\s*[a-z0-9](\s*,\s*[a-z0-9])*)?\s*}\s*$/;
        let stringEntrada = e.target.value

        if(stringEntrada === null || stringEntrada === ""){
            document.getElementById("msg-"+e.target.id).style = "color:#D60000;"
            document.getElementById("msg-"+e.target.id).textContent = "Este campo es requerido"
        }else{
            document.getElementById("msg-"+e.target.id).textContent = ""
            let aux = stringEntrada.split(" ")
            aux[0] = "/"+aux[0].substr(1,aux[0].length-1).toUpperCase()
            let conjuntos
            if(operacionesString.includes(aux[0])){
                document.getElementById("msg-"+e.target.id).style = "color:#D60000;"
                setOperador(operacionesString.indexOf(aux[0]))
                document.getElementById("msg-entrada").textContent = "Ingrese los conjuntos en notacion extensiva"
                if(aux.length > 1){
                    conjuntos = aux[1].split(";")
                    if (conjuntos[0].length > 0){
                        if (expReg.test(conjuntos[0])) {
                            setCinta1(conjuntos[0])
                            document.getElementById("msg-"+e.target.id).textContent = ""
                            document.getElementById("msg-entrada").textContent = "Ingrese el segundo conjunto"
                            if (conjuntos.length > 1 &&conjuntos[1].length > 0){  
                                if (expReg.test(conjuntos[1])) {
                                    setCinta2(conjuntos[1])
                                    document.getElementById("msg-"+e.target.id).textContent = ""
                                }else{
                                    setCinta2("")
                                    document.getElementById("msg-"+e.target.id).textContent = "Conjunto 2: No cumple con la notación extensiva de conjuntos"
                                }
                            }
                        }else{
                            setCinta1("")
                            document.getElementById("msg-"+e.target.id).textContent = "Conjunto 1: No cumple con la notación extensiva de conjuntos"
                        }
                    }
                }
            }else if(aux[0].length>1 && aux[0][1].toUpperCase() == "D"){
                document.getElementById("msg-"+e.target.id).style = "color:#02CA52;"
                document.getElementById("msg-"+e.target.id).textContent = "Claves válidas: "
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/DR = Diferencia relativa")
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/DS = Diferencia simetrica")
            }else if (aux[0].length>0){
                document.getElementById("msg-"+e.target.id).style = "color:#D60000;"
                document.getElementById("msg-"+e.target.id).textContent = "Claves válidas: "
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/U = Union")
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/I = Interseccion")
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/DR = Diferencia relativa")
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/DS = Diferencia simetrica")
                document.getElementById("msg-"+e.target.id).appendChild(document.createElement('br'))
                document.getElementById("msg-"+e.target.id).append("/C = Complemento")
            }
        }
    }

    const cambiarInterfaz = (e) =>{
        setInterfaz(e.target.value)
        setCinta("")
        setCinta1("")
        setCinta2("")
        setResultado(undefined)
        setOperador("-1")
        if(interfaz === "0"){
            document.getElementById("entrada").value = ""
            document.getElementById("msg-entrada").textContent = ""
        }else{
            document.getElementById("cinta1").value = ""
            document.getElementById("cinta2").value = ""
            document.getElementById("msg-cinta1").textContent = ""
            document.getElementById("msg-cinta2").textContent = ""
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        calcular()
    }

    return (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <div className='row mb-3 align-items-center'>
                <div className='col-md-1'>
                    <label className="form-label text-bold ps-3">Modo: </label>
                </div>
                <div className='col-md-6'>
                    <select defaultValue={"0"} className="form-select form-select-md text-regular rounded-3" onChange={(e) => cambiarInterfaz(e)} onBlur={(e) => cambiarInterfaz(e)}>
                        <option value="0">Avanzado</option>
                        <option value="1">Interfaz</option>
                    </select>
                </div>
            </div>
            {interfaz === "0" ? //modo avanzado 
                <form onSubmit={onSubmit}>
                    <div className='container mb-3'>
                        <div className='row'>
                            <div className="mb-3">
                                <label className="form-label text-bold">Entrada</label>
                                <input placeholder='/clave_operacion {a,...,z,0,...,9};{a,...,z,0,...,9})' type="text" className="form-control rounded-3 text-regular" id="entrada" onChange={(e) => validarEntrada(e)} onBlur={(e) => validarEntrada(e)}/>
                                <p className='text-m-22 txt-error' id="msg-entrada"></p>
                            </div>
                        </div>
                        <div className='row mb-3 align-items-end'>
                            <div className='col-md-6'>
                                <button className="btn btn-primary btn-submit text-bold mb-3 rounded-3" id="btn-calcular">Calcular</button>
                            </div>
                        </div>
                    </div>
                </form>
            :
                //modo interfaz
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
            }
            <div className='container mt-5' id="container-result">
                <label className="form-label text-bold">Resultado: </label>
                <input className="form-control rounded-3 text-bold txt-error input-error" id="resultado" disabled value={resultado}/>
            </div>
        </div>
    )
}

export default Operaciones