import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.js';

function closeModal(){
    document.getElementsByClassName("mask")[0].classList.remove("active");
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  
  }
      
  function runReactApp(userid) {
    document.getElementsByClassName("mask")[0].classList.add("active");
        ReactDOM.render(React.createElement(App, { user_id: userid, closeModal: closeModal }), document.getElementById('root'));
  
    console.log(userid);
    
  }
      let t = document.getElementsByClassName("show");
      for(let i = 0; i < t.length; i++){
        t[i].addEventListener("click", function() {
      runReactApp(t[i].id)
  }, false);
  
      }
  