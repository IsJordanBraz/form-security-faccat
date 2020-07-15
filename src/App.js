import React, { useState,useEffect, Component  } from "react";
import {useForm, appendErrors} from 'react-hook-form';
import firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { render } from "@testing-library/react";

const firebaseConfig = {
  apiKey: "AIzaSyBa0Bmthv2h1NxkYh222wypUznCCeRIFC4",
  authDomain: "cloudfunctions-7c349.firebaseapp.com",
  databaseURL: "https://cloudfunctions-7c349.firebaseio.com",
  projectId: "cloudfunctions-7c349",
  storageBucket: "cloudfunctions-7c349.appspot.com",
  messagingSenderId: "319887265067",
  appId: "1:319887265067:web:931d3dbd3afc4851a2896e",
  measurementId: "G-5JT7VWTEHS"
};
const firebaseImpl = firebase.initializeApp(firebaseConfig);
const firebaseDatabase = firebase.database();

class AppTeste extends React.Component {
  constructor(props) {
    super(props);
    this.database = firebaseImpl.database().ref(`/curriculos`);
    this.state = {
      value: 20,
      data: [],
    };
  }

  componentDidMount(){
    this.database.on('value', snap =>{
      this.setState({
        data: Object.entries(snap.val()).map(([, value]) => value)
      });
    });
  }

  render() {
    return (
      <div>                 
        <ul>
          {this.state.data.map(item=> (
            <li key={item.telefone}>
              <p>{item.nome}</p>
              <p>{item.email}</p>              
              <Link to={{ pathname: "/users", state: { teste: item} }}>Consulta</Link>
            </li>
          ))};
        </ul>
      </div>
    );
  }
}

class Consulta extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.state = {
      fromAppItem: props.location.state,
    }
  }
  render() {
    return (
      <div>                 
        <ul>         
            <li>
              <p>Nome: {this.state.fromAppItem.teste.nome}</p>
              <p>Email: {this.state.fromAppItem.teste.email}</p>
              <p>Telefone: {this.state.fromAppItem.teste.telefone}</p>
              <p>Site: {this.state.fromAppItem.teste.site}</p>
              <p>Experiencia: {this.state.fromAppItem.teste.experiencia}</p>
            </li>          
        </ul>
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Listagem dos currículos</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/cadastro">
            <Cadastro />
          </Route>
          <Route path="/users" component={Consulta}/>
          <Route path="/">
            <AppTeste />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Cadastro() {
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = (data) => {
    firebaseDatabase.ref(`/curriculos`).push(data);    
    console.log("enviado");
  }
  function botaoo(){
    console.log("teste");
  }
  return <div>
    <h2>Cadastrar currículo</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
        <p>Campos com * são Obrigatórios </p>        
        <input type="text" placeholder="Nome Completo*" name="nome" ref={register({ required:true })}/>
        <input type="text" placeholder="Telefone" name="telefone" ref={register}/>
        <input type="text" placeholder="Email*" name="email" ref={register({ required:true })}/>
        <input type="text" placeholder="Endereço web" name="site" ref={register}/>
        <input type="text" placeholder="Experiência Profissional*" name="experiencia" ref={register({ required:true })}/>
        {errors.nome && <p>Nome inválido</p>}
        {errors.email && <p>email inválido</p>}
        {errors.experiencia && <p>Experiência inválida</p>}
        <input type="submit" onClick={botaoo}/>
    </form>
  </div> ;
}

function Users() {
  return <h2>Users</h2>;
}
