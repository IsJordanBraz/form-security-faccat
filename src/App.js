import React, { useState,useEffect  } from "react";
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
            <li>
              <Link to="/users">Consulta</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/cadastro">
            <Cadastro />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// async function listaCurriculo(){
//   const snapshot = await firebaseDatabase.ref(`/curriculos`);
//   snapshot.limitToLast(20).once('value', async snap => {
//     const result = Object.entries(snap.val()).map(([, value]) => value);
//     console.log(result);
//   });  
// }

function Home() {
  const [isLoaded, setLoaded] = useState(true);
  const [lista, setLista] = useState([]);  
  
  if(!isLoaded){
    return <div><button onClick={null} >Atualizar</button>Loading...</div>;
  }else{ 
    return <div>
      <h2>Home</h2>
      <ul>
        {  }
      </ul>
      <button onClick={null} >Atualizar</button>
    </div> ;
   }
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