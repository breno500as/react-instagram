import React, { Component } from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component {

//http://localhost:8080/api/public/fotos/rafael

   constructor() {
       super();
       this.state = {listaFotos:[]};
   }

   componentDidMount(){
       fetch('http://localhost:8080/api/public/fotos/rafael')
        .then(response => response.json())
        .then(fotos => {
           this.setState({listaFotos:fotos});
        })
   }

    render(){
        return (
        <div className="fotos container">
           { this.state.listaFotos.map(foto => {
             return(   <FotoItem foto={foto} key={foto.id} /> )
           })
           }
        </div>            
        );
    }
}