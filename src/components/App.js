import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res =>{
      this.setState({posts: res.data})
    })
    .catch(err =>{
      console.log(err)
    })
  }

  updatePost(id, text) {
    console.log(id, text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res =>{
      console.log(res.data)
      this.setState({posts: res.data})
    })
    .catch(err =>{
      console.log(err)
    })
  }

  deletePost(id) {
    console.log(id)
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res =>{
      this.setState({posts: res.data})
      console.log(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts',{text})
    .then(res =>{
      this.setState({posts: res.data})
    })
    .catch(err =>{
      console.log(err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {posts.map(post =>(
            <Post 
              key = {post.id}
              text = {post.text}
              date = {post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
             />
          ))}
          
        </section>
      </div>
    );
  }
}

export default App;
