import React, {Component} from 'react';
import {Link, withRouter }  from 'react-router-dom'
import firebase from '../../firebase'
import './dash.css'

 class Dashboard  extends Component{
    constructor(props){
        super(props);

        this.state={
            nome:''
           
        }
        this.logout = this.logout.bind(this)
    }

  
         componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/loguin')
            return null;
        }
         // Á função de recuperar o nome não funciona 
        firebase.getUserName((info)=>{
         this.setState({nome: info.val().nome});
        })

    }

    logout = async () => {
       await firebase.logout()
       .catch((error) =>{
           console.log(error)
       });
       localStorage.removeItem('nome');
       this.props.history.push('/');
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Ola,{this.state.nome} seja bem-vindo</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                 <p>Logado com: {firebase.getCurrent()}</p>
                <button onClick={()=> this.logout()} >Sair</button>
            </div>
        );
    }
}

export default withRouter(Dashboard);
/* 
    constructor(props){
        super(props);

        this.state = {
            nome: localStorage.nome 

        }
        this.logout = this.logout.bind(this)
    }
    
  async  componentDidMount(){
        if(firebase.getCurrent()){
            this.props.history.replace('/loguin');
            return null;
        }
        
    firebase.getUserName((info) =>{
        localStorage.nome = info.val().nome
        this.setState({nome: localStorage.nome});
    });
    }

    

    logout(){

    }

*/