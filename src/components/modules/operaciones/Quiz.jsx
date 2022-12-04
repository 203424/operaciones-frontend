import React,{ useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';

const QuizOp = () => {

    const [opciones, setOpciones] = useState([]);
    const [mode, setMode] = useState(-1);
    
    useEffect(() => {
        funcionPrueba()
    }, [])
    
    
    const funcionPrueba = () =>{
        let names = ["opcion1","opcion2","opcion3","opcion4"]
        setOpciones(names)
        setMode(0)
    }

    return (
        <div className='container position-absolute top-50 start-50 translate-middle'>
            <p className='text-bold'>Ejercicio aleatorio</p>
            <form>
            <div className="row mb-3">
                {opciones.map((element,index) => {return(
                    mode === 0 ?
                    <div key={index} className="col-lg-4 col-sm-6">
                        <div className="form-check text-regular">
                            <input className="form-check-input" type="checkbox" value="" id={"flexCheckDefault"+index}/>
                            <label className="form-check-label">
                                {element}
                            </label>
                        </div>
                    </div> : 
                    <div  key={index} className="col">
                        <div className="form-check text-regular">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id={"flexRadioDefault" + index}/>
                            <label className="form-check-label">
                                {element}
                            </label>
                        </div>
                    </div>
                )
                })}
            </div>
            <div className='row mb-3 justify-content-center'>
                <div className='col col-sm-4'>
                    <button className="btn btn-primary btn-submit text-bold rounded-3" id="btn-calcular">Calcular</button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default QuizOp
