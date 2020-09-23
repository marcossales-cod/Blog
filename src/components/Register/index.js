import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import firebase from  '../../firebase';
import './register.css'

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            nome: '',
            email: '',
            password: ''  
        }
      this.register = this.register.bind(this) 
      this.onRegister = this.onRegister.bind(this)  
    }


    register(e){
    
       
        e.preventDefault();
   
        this.onRegister()
    }

    onRegister = async()=>{

        try{

            const {nome, email, password} = this.state
        
            await firebase.register(nome, email, password)
          
            this.props.history.replace('/dashboard') ;   
        }catch(error){
            alert(error.message)
        }
        


    }



    render(){
        return(
            <div>
               <h1 className="register-h1" >Novo usuário</h1> 
            
                <form  onSubmit={this.register} id="register">
                    <label>Nome:</label><br/>
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off" 
                    onChange={(e) => this.setState({nome: e.target.value}) }  placeholder="ex: nome" /><br/>
                    
                     <label>Email:</label><br/>
                    <input type="email"    autoComplete="off"  value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value}) }  placeholder="email@gmail.com"  /><br/>

                    <label>Senha:</label><br/>
                    <input type="password"   autoComplete="off"  value={this.state.senha}
                    onChange={(e) => this.setState({password: e.target.value}) }  placeholder="senha" /><br/>

                    <button type="submit">cadastrar</button>
                </form>
            </div>
        );

    }

}

export default  withRouter(Register)
