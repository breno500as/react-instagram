import React, { Component } from 'react';
import {Link} from 'react-router'

class FotoAtualizacoes extends Component {
    
    like(event){
      event.preventDefault();      
      //chama o método like de timeline
      this.props.like(this.props.foto.id);
    }

    comenta(event){
      event.preventDefault();
      //chama o método comenta de timeline
      this.props.comenta(this.props.foto.id,this.comentario.value);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." ref={(input) => this.comentario = input} className="fotoAtualizacoes-form-campo"/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}

class FotoInfo extends Component {
    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                {this.props.info.likers.map(like => {
                    return (<Link to={`/timeline/${like.login}`} key={like.login}>{like.login}</Link>)
                })}
                curtiram
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                 {this.props.info.comentario}
              </p>
              
              <ul className="foto-info-comentarios">

              {this.props.info.comentarios.map(comentario => {
                      
                  return (

                   <li className="comentario" key={comentario.id}>
                    <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                      {comentario.texto}
                   </li>
                  )
              })}

              </ul>
          </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.header.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${this.props.header.loginUsuario}`}>
                    {this.props.header.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data"> {this.props.header.horario}</time>
            </header>            
        );
    }
}

export default class FotoItem extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader header={this.props.foto}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo info={this.props.foto}/>
            <FotoAtualizacoes {... this.props}/>
          </div>            
        );
    }
}