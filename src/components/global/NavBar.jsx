import React from "react";
import * as bootstrap from 'bootstrap';
import logo from "./assets/assets/img/logo_up.jpg";
import './assets/css/styles.css';
import { Link } from "react-router-dom";

const NavBar = () => {

    const showNav = () =>{
        if (document.getElementById("navbarNavDropdown").classList.contains("show")){
            document.getElementById("navbarNavDropdown").classList.remove("show")
        }else{
            document.getElementById("navbarNavDropdown").classList.add("show")
        }
    }

	return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <img src={logo} alt="Logo"  className="d-inline-block align-text-top logo"/>
                <a className="navbar-brand" href="/">Title</a>
                <button className="navbar-toggler" type="button" onClick={() => showNav()}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Notación
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Operaciones de conjuntos
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/operaciones">Modo tutor</Link></li>
                                <li><Link className="dropdown-item" to="operaciones/quiz">Quiz</Link></li>
                                <li><Link className="dropdown-item" to="operaciones/ejercicios">Ejercicios</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Relaciones de conjuntos
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Conjunto potencia
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Producto cartesiano
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Familia de conjunto
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Leyes
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Particiones
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Seccion 1</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 2</Link></li>
                                <li><Link className="dropdown-item" to="/">Seccion 3</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
	);
};

export default NavBar;
