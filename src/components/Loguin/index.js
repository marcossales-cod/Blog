import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from  '../../firebase';
import './loguin.css'

class Loguin extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''  
        }
        this.Entrar = this.Entrar.bind(this)
    }

    componentWillMount(){
        if(firebase.getCurrent()){
            return this.props.history.replace('dashboard')
        }
    }


    Entrar(e){
        
        e.preventDefault();
   
        this.loguin()    
    }

    loguin = async () =>{
        const {email, password} = this.state
        
        try{
            await firebase.loguin(email, password)
            .catch((error) =>{
            if(error.code === 'auth/user-not-found'){
                alert('Usario inexistente!!')
            }else{
                alert('Codigo de erro' + error.code)
                return null
            }    
        });
        this.props.history.replace('/dashboard');
        }catch(error){
            alert('Codigo de erro' + error.code)
        }

        
        
         
    }



    render(){
        return(
            <div>
             <form onSubmit={this.Entrar} id="loguin">
                <label>Email:</label><br/>
                <input type="email" autoComplete="off" valeu={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})} placeholder="email@gmail.com"
                />
                <label>Senha:</label><br/>
                <input type="password" autoComplete="off" value={this.state.password}
                onChange={(e)=> this.setState({password: e.target.value}) } placeholder="senha"
                /><br/>

                <button type="submit">Entrar</button><br/>

                <Link to="/register" >ainda não possue cadastro? clique aqui!</Link>
             </ form>
            </div>
        );

    }

}

export default  withRouter(Loguin)
