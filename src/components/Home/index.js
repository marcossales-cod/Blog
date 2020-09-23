import React, {Component} from 'react';
import firebase from '../../firebase'
import './home.css';




class Home extends Component{
   //armazenar os posts do blog 
    state ={
        post:[]
    }

    componentDidMount(){
        firebase.app.ref('post').once('value', (snapshot) =>{
          let state  =  this.state 
          state.post = [];
          snapshot.forEach(childItem => {
              state.post.push({
                  key: childItem.key,
                  titulo: childItem.val().titulo,
                  subtitulo: childItem.val().subtitulo,
                  imagem: childItem.val().imagem,
                  autor: childItem.val().autor,
                  descricao: childItem.val().descricao
              })
          });
          state.post.reverse(); 
          this.setState(state);
        })
    }

    render(){
    return(
       <section id="post">
           {this.state.post.map(post =>{
               return(
                   <article  key={post.key}>
                       <header>
                           <div className="title">
                               <strong>{post.titulo}</strong>
                              
                           </div>
                       </header>
                       <img  src={post.imagem} alt="Capa"/>
                        <strong>{post.subtitulo}</strong>
                       <footer className="st">
                            <p>{post.descricao}</p>
                       </footer>
                   </article>
               );
           })}
       </section>
    );
}

}
export default Home;