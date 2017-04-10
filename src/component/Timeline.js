import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';


export default class Timeline extends Component {

  //http://localhost:8080/api/public/fotos/rafael

  constructor() {
    super();
    this.state = { listaFotos: [] };
    this.publicUser = '';
  }

  checkProfile() {

    let url = '';

    if (this.publicUser !== undefined && this.publicUser !== '') {
      url = `http://localhost:8080/api/public/fotos/${this.publicUser}`;
    } else {
      url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(fotos => {
        this.setState({ listaFotos: fotos });
      })

  }

  like(fotoId) {
    fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("não foi possível realizar o like da foto");
        }
      })
      .then(liker => {
        Pubsub.publish('atualiza-liker', { fotoId, liker });
      });
  }

  comenta(fotoId, textoComentario) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: textoComentario }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("não foi possível comentar");
        }
      })
      .then(novoComentario => {
        Pubsub.publish('novos-comentarios', { fotoId, novoComentario });
      });
  }

  componentWillMount() {
    Pubsub.subscribe('timeline', (topico, fotos) => {
      this.setState({ listaFotos: fotos });
    });

     Pubsub.subscribe('novos-comentarios',(topico,infoComentario) => {
        const fotoAchada = this.state.listaFotos.find(foto => foto.id === infoComentario.fotoId);        
        fotoAchada.comentarios.push(infoComentario.novoComentario);
        this.setState({listaFotos:this.state.listaFotos});        
      });      

     Pubsub.subscribe('atualiza-liker',(topico,infoLiker) => {        
        const fotoAchada = this.state.listaFotos.find(foto => foto.id === infoLiker.fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);

        if(possivelLiker === undefined){
          fotoAchada.likers.push(infoLiker.liker);
        } else {
          const novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
          fotoAchada.likers = novosLikers;
        }
        this.setState({listaFotos:this.state.listaFotos});

      });
  }

  componentDidMount() {
    this.checkProfile();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.publicUser !== undefined) {
      this.publicUser = nextProps.publicUser;
      this.checkProfile();
    }
  }

  render() {
    return (
      <div className="fotos container">
      
        <ReactCSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {this.state.listaFotos.map(foto => {
            return (<FotoItem key={foto.id} foto={foto} like={this.like} comenta={this.comenta} />)
          })
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}