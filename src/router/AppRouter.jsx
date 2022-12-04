import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from '../components/global/NavBar';
import Index from '../components/modules/conjunto_potencia/Index';
import Operaciones from '../components/modules/operaciones/Operaciones';
import EjerciciosOp from '../components/modules/operaciones/Ejercicios';
import QuizOp from '../components/modules/operaciones/Quiz';

const AppRouter = () => {
    
    return (
        <>
            <div className='container-xxl m-3 pt-1'>
                <Router>
                    <div className='row mb-5 pb-3'>
                        <NavBar />
                    </div>
                    <Routes>
                        {/* Agregar sus rutas aquí */}
                        <Route path='/potencia' element={<Index />} />
                        <Route path='/operaciones' element={<Operaciones />} />
                        <Route path='/operaciones/quiz' element={<QuizOp />} />
                        <Route path='/operaciones/ejercicios' element={<EjerciciosOp />} />
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default AppRouter
