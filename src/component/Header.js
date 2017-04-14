import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import TimelineApi from '../api/TimelineApi'


export default class Header extends Component {

   pesquisa(event){
      event.preventDefault();
      this.props.store.dispatch(TimelineApi.pesquisa(this.loginPesquisado.value));
    }

   constructor(){
    super();
    this.logout.bind(this);
    this.state = {msg:''};
   }

    componentWillMount(){
      this.props.store.subscribe(() => {
        this.setState({msg:this.props.store.getState().notificacao});
      })
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
                <span>{this.state.msg}</span>
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