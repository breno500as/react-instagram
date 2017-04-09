import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './component/Login';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import './css/app.css';
import {matchPattern} from 'react-router/lib/PatternUtils';
import {Router, Route, browserHistory} from 'react-router'

function checkLoggedUser(nextState,replace) {

  //verifica se foi digitado algo depois da timeline para acessar o perfil publico
  //se não cobra o token para acesso privado
  const resultado = matchPattern('/timeline(/:publicUser)',nextState.location.pathname);
  const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;

 
   if(enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {
     replace("/?msg=Sessão encerrada.Fineza efetuar o login");
   }

}

ReactDOM.render(
   
   <Router history={browserHistory}>
     
      <Route path="/" component={Login} />
      <Route path="/timeline(/:publicUser)" component={App} onEnter={checkLoggedUser} />
     
   </Router>
  ,
  document.getElementById('root')
);
