import React, {Component} from 'react';
import { Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './New.css'

class New extends Component{
  constructor(props){
  super(props);
  
   this.state={
    
    descricao: '',
    imagem: null,
    url: '',
    titulo: '',
    alert: '',
    progress: ''
    
  }
  this.handleUpload = this.handleUpload.bind(this)
  this.handleFile = this.handleFile.bind(this);  
  this.cadastrar = this.cadastrar.bind(this);
 
 }
  
  componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/')
      return null;
    }
    }

  cadastrar = async(e) =>{
    
    e.preventDefault();
    
    if(this.state.titulo !== '' &&
       this.state.imagem !== '' &&
       this.state.descricao !== '' &&
       this.state.imagem !== null && 
       this.state.url !== ''
       ){
      let post = firebase.app.ref('post')
      let chave = post.push().key;
      await post.child(chave).set({
        titulo: this.state.titulo,
        imagem: this.state.url,
        descricao: this.state.descricao,
      });
      this.props.history.replace('/dashboard')
    }else{
      this.setState({alert: 'Preencha corretamene todos os campos!'})
    }

  }

 
  handleFile = async(e) =>{
    if(e.target.files[0]){
    //o nome tem que ser image

    const image = e.target.files[0];

    if(image.type === 'image/png' || image.type === 'image/jpeg'){
      await this.setState({imagem: image});
      this.handleUpload();
    }else{
      alert('Envie uma imagem do tipo JPG ou PNG')
      this.setState({imagem: null});
      return null;
    }
   
  }

}

    handleUpload  = async () =>{
    const {imagem} = this.state;
    const currentUid  = firebase.getCurrentUid();
   
    const uploadTask = firebase.storange
    .ref(`images/${currentUid}/${imagem.name}`)   
    .put(imagem);  

      await uploadTask.on('state_changed',
      (snapshot) =>{
        //progress
      const progress = Math.random(
        (snapshot.bytesTransferred / snapshot.totalBytes * 100)
        );
        this.setState({progress});
      },
      (error)=>{
        //error
        
        console.log('Error imagem' + error);
      },
      ()=>{
       //sucesso 
        firebase.storange.ref(`images/${currentUid}`)
        .child(imagem.name).getDownloadURL()
        .then(url => {
          this.setState({url: url});
        })
        
      });
      
  }


  render(){
      return(
          <div>
              <header id="new">
            <Link to="/dashboard">Voltar</Link>
              </header>
              <form onSubmit={this.cadastrar} id="new-post">
                  <span>{this.state.alert}</span><br/>
                  
                  <input type="file"
                  onChange={this.handleFile}/><br/>
                  {this.state.url !==  '' ?
                    
                    
                    <img src={this.state.url} width="250" height="150" alt="capa do seu post"/>
                    : 

                    <progress  value={this.state.progress} max="100"  id="up-img"/>
                  }

                  <label>Titulo:</label><br/>
                  <input type="text" placeholder="nome do post" 
                  value={this.state.titulo} autoFocus id="diferentao"
                  onChange={(e)=> this.setState({titulo: e.target.value})}/><br/>

                 
                 
                  <label>Descrição:</label><br/>
                  <textarea type="text" placeholder="subtitulo do post" value={this.state.descricao} 
                  onChange={(e)=>this.setState({descricao: e.target.value})}/><br/>

                  <button type="submit">Cadastrar</button>
              </form>
          </div>
      );
  }  
}

export default withRouter(New);



/*
 componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/')
      return null
    }
    }

  cadastrar = async (e) =>{
    e.prevent.Default();
    
    if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== '' ){
        let post = firebase.app.ref('post')
        let chave = post.push().key;
        await post.child(chave).set({
          titulo: this.state.titulo,
          imagem: this.state.imagem,
          descricao: this.stetate.descricao,
          nome: this.state.nome
        });
        this.props.history.replace('/dashbord')
      }else{
        this.setState({alert: 'Preencha corretamene todos os campos!'})
      }
}


<span>{this.state.alert}</span>
*/ 