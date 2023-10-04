import React, { useState, useEffect, useContext, Component } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";


const Planets = props => {

    const { store, actions } = useContext(Context);
    const [state, setState] = useState({
        //initialize state here
    });


    return (
        
            
                <div className="card col-2 px-0 mx-3 mb-3 bg-black text-white border-light" style={{ width: "19.7rem" }}>
                    {props.id === 0 ?
                        <img src={"https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png"} className="card-img-top" alt="..." /> :
                        <img src={"https://starwars-visualguide.com/assets/img/planets/" + (props.id + 1) + ".jpg"} className="card-img-top" alt="..." />}
                    <div className="card-body m-0 p-0" style={{ height: "170px" }}>
                        <h5 className="card-title fs-4 text my-2 mx-2">{props.name}</h5>
                        <p className="card-text text-start mx-2 p-0 my-0"><b>Population: </b>{props.population}</p>
                        <p className="card-text text-start mx-2 "><b>Terrain: </b>{props.terrain}</p>
                        <Link to={"/details/planets/" + props.id} className="btn position-absolute bottom-0 start-0  m-2 btn-outline-primary ">Learn more!</Link>
                        <button className="btn position-absolute bottom-0 end-0 m-2 btn-outline-warning" onClick={() => actions.agregarFavorito(props.name)}><i className="fa fa-heart"></i></button>
                    </div>
                </div>
            
       
    )
}


Planets.propTypes = {
    name: PropTypes.string,
    population: PropTypes.string,
    terrain: PropTypes.string,
    id: PropTypes.string,

};

Planets.defaultProps = {
    onDelete: null
};


export default Planets;