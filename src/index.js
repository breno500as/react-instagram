import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login';
import './styles/reset.css';
import './styles/timeline.css';
import './styles/login.css';
import './styles/app.css';
import {timeline} from './reducers/timeline'
import {notificacao} from './reducers/header';
import { matchPattern } from 'react-router/lib/PatternUtils'
import { Router, Route, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'

const reducers = combineReducers({ timeline: timeline, notificacao: notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function checkLoggedUser(nextState, replace) {

  //verifica se foi digitado algo depois da timeline para acessar o perfil publico
  //se não cobra o token para acesso privado
  const resultado = matchPattern('/timeline(/:publicUser)', nextState.location.pathname);
  const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;


  if (enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {
    replace("/?msg=Sessão encerrada.Fineza efetuar o login");
  }

}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/timeline(/:publicUser)" component={App} onEnter={checkLoggedUser} />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
