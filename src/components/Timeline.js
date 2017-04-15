import React, { Component } from 'react';
import FotoItem from './Foto';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TimelineApi from '../api/TimelineApi'
import {connect} from 'react-redux';

 class Timeline extends Component {

  //http://localhost:8080/api/public/fotos/rafael

  constructor() {
    super();
    this.publicUser = '';
  }
 

  componentDidMount() {
    this.checkProfile();
  }

  checkProfile() {

    let url = '';

    if (this.publicUser !== undefined && this.publicUser !== '') {
      url = `http://localhost:8080/api/public/fotos/${this.publicUser}`;
    } else {
      url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    }

     this.props.lista(url);

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

          {this.props.listaFotos.map(foto => {
            return (<FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta} />)
          })
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {listaFotos : state.timeline}
};

const mapDispatchToProps = dispatch => {
  return {
    like : (fotoId) => {
      dispatch(TimelineApi.like(fotoId));
    },
    comenta : (fotoId,textoComentario) => {
      dispatch(TimelineApi.comenta(fotoId,textoComentario))
    },
    lista : (urlPerfil) => {
      dispatch(TimelineApi.lista(urlPerfil));      
    }

  }
}

const TimelineContainer = connect(mapStateToProps,mapDispatchToProps)(Timeline);

export default TimelineContainer