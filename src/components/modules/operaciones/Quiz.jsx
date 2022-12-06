import React,{ useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { axiosInstance } from '../../../helpers/axios';
import './../../global/assets/css/styles.css';

const QuizOp = () => {

    const [opciones, setOpciones] = useState([]);
    const [ejercicio,setEjercicio] = useState([]);
    
    useEffect(() => {
        handleRequest()
    }, [])

    useEffect(()=>{
        generarEjercicio()
    },[ejercicio])

    let aux = []
    
    const handleRequest =  async() => {
        await axiosInstance.get('operaciones/quiz/random/')
        .then(resp => {
            console.log("res: ",resp.data);
            setEjercicio(resp.data)
            resp.data.result.forEach(element => {
                aux.push({opc:element, state:Math.floor(Math.random()*2) === 1 ? true : false})
            });
            setOpciones(aux)
            aux = []
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

    const verificar = () =>{
        for (let index = 0; index < opciones.length; index++) {
            // console.log(e.target[index].id,":",e.target[index].checked," value:",opciones[index].state)
            document.getElementById("labelChecked"+index).style = "color: white;"
            if (document.getElementById("flexCheckDefault"+index).checked === opciones[index].state){
                document.getElementById("container-CheckDefault"+index).style = "background: #02CA52; padding-left: 2em;"
            }else{
                document.getElementById("container-CheckDefault"+index).style = "background: #D60000; padding-left: 2em;"
            }
        }
        document.getElementById("btn-calcular").disabled = true
    }

    const continuarQuiz = () => {
        handleRequest()
        for (let index = 0; index < opciones.length; index++) {
            document.getElementById("labelChecked"+index).style = "color: black;"
            document.getElementById("container-CheckDefault"+index).style = "background: #fff;"
            document.getElementById("flexCheckDefault"+index).checked = false
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(document.getElementById("btn-calcular").disabled === false){
            console.log("verifica")
            verificar()
        }else{
            document.getElementById("btn-calcular").disabled = false
        }
        if (document.getElementById("container-btn-continuar").classList.contains("show")){
            document.getElementById("container-btn-continuar").classList.remove("show")
        }else{
            document.getElementById("container-btn-continuar").classList.add("show")
        }
    }

    return (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <p className='text-regular' id="ejercicio"></p>
            <form onSubmit={onSubmit}>
                <div className="row mb-3">
                    {opciones.map((element,index) => {return(
                        <div key={index} className="col-lg-4 col-sm-6">
                            <div className="form-check text-regular rounded-2" id={"container-CheckDefault"+index}>
                                <input className="form-check-input" type="checkbox" value="" id={"flexCheckDefault"+index} />
                                <label className="form-check-label" id={"labelChecked"+index}>
                                    {element.opc}
                                </label>
                            </div>
                        </div>
                    )
                    })}
                </div>
                <div className='row mb-3 justify-content-center'>
                    <div className='col col-sm-4 mb-3'>
                        <button className="btn btn-primary btn-submit text-bold rounded-3" id="btn-calcular">Calcular</button>
                    </div>
                    <div className='col col-sm-1 mb-3 show' id='container-btn-continuar'>
                        <button className="btn btn-primary btn-submit text-bold rounded-3" style={{width:"auto"}} id="btn-continuar" onClick={() => continuarQuiz()}>
                            <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QuizOp
