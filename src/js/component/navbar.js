import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import navbar from "../../styles/index.css";
export const Navbar = () => {

  const { store, actions } = useContext(Context);
  const [listaFavoritos, setlistafavoritos] = useState([])
  const navigate =useNavigate();

  useEffect(function () {
    //  setlistafavoritos(store.favoritos)
  actions.mostrarfavoritos()

  }, [])
  
  // funcion para que desapareza el botón cuando no estoy logueado

  const handleLogout =  () => {
    actions.LogOut()
    navigate("/login")
  }

  // funcion para que desapareza favoritos cuando no estoy logueado

  const ocultarfavorito =  () => {
    // actions.LogOut()
    // navigate("/login")
  }


  return (
    <nav className="navbar navbar-light bg-light mb-3 sticky-top nav">
      <img id="local-nav-logo-desktop" className="d-flex ms-5 " style={{ width: "100px" }} src="https://logos-marcas.com/wp-content/uploads/2020/11/Star-Wars-Logo.png" />
      <div className="nav-item dropdown">
        {store.autenticar}
        <a className="nav-link dropdown-toggle btn btn-primary boton " style={{color: "black"}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Favorites <span className="badge text-bg-secondary ">{store.favoritos.length}</span>
        </a>
        
        <ul className="dropdown-menu menu">
          {store.favoritos.map((item,index) => {
            return(
								<div  className="favorite-item">
									<li>
										<a class="dropdown-item" href="#">{item} 
											<i className="fas fa-trash-alt trash" onClick={()=>actions.eliminarFavorito(item)}></i>
										</a>									
									</li>
								</div>
								)
                })}
        </ul>
      </div>
      {store.autenticar && <button type="submit"  class="btn btn-primary" onClick={handleLogout}>logout</button>}

    </nav>
  );
};