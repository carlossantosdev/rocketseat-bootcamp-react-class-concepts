import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'


/**
* Babel: Conveter (transpilar) código do Reac para um código que o browser entenda
* Webpack: Pra cada tipo de arquivo (.js, .css, .png) eu vou converter o código de uma maneira diferente
* 
* Loaders: babel-loader, css-loader, image-loader, etc.
*/

/**
 * Component
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('projects').then(response => setProjects(response.data));
  }, [])
  // useState retorna um array com 2 posições
  // 
  // 1. Variável com seu valor inicial
  // 2. Função para atualizarmos esse valor
  

  async function handleAddProject(){
    const project = {
      title: `Primeiro projeto ${Date.now()}`,
	    owner: "Carlos Santos"
    }

    const response = await api.post('projects', project)
    setProjects([...projects, response.data])
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        { projects.map(project => <li key={project.id}>{project.title} - {project.owner}</li>) }
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App;