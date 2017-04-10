import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import Pubsub from 'pubsub-js';


export default class Header extends Component {

   pesquisa(event){
      event.preventDefault();
      fetch(`http://localhost:8080/api/public/fotos/${this.loginPesquisado.value}`)
        .then(response => response.json())
        .then(fotos => {
          Pubsub.publish('timeline',fotos);
        });
    }

   constructor(){
    super();
    this.logout.bind(this);
   }

   logout(event) {
     event.preventDefault();
     localStorage.removeItem('auth-token');
     browserHistory.push('/');
   }

    render(){
        return (
        <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>

          <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
            <input type="text" name="search" ref={input => this.loginPesquisado = input} placeholder="Pesquisa" className="header-busca-campo"/>
            <input type="submit" value="Buscar"  className="header-busca-submit"/>
          </form>


          <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="#">
                  ♡
                  {/*                 ♥ */}
                  {/* Quem deu like nas minhas fotos */}
                </a>
              </li>
            </ul>
          </nav>
             
          <input type="button" onClick={this.logout} value="Logout"></input>

        </header>            
        );
    }
}