import React, { Component } from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component {

//http://localhost:8080/api/public/fotos/rafael

   constructor() {
       super();
       this.state = {listaFotos:[]};
       this.publicUser = '';
   }

   checkProfile() {
      
      let url = '';
      
       if (this.publicUser !== undefined && this.publicUser !== '') {
         url  = `http://localhost:8080/api/public/fotos/${this.publicUser}`;
       } else {
         url =  `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
       }
     
       fetch(url)
        .then(response => response.json())
        .then(fotos => {
           this.setState({listaFotos:fotos});
        })
           
   }

   componentDidMount(){
      this.checkProfile();
   }

   componentWillReceiveProps(nextProps) {

       if(nextProps.publicUser !== undefined){
        this.publicUser = nextProps.publicUser;
        this.checkProfile();
      }
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