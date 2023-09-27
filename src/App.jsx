import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'


import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { store } from './store/store'
import './assets/style/main.scss'

import { useEffect, useState } from "react"

export  function App() {

  // const handleChange = (ev) => {
  //   // setAge(ev.target.value);
  //   setFilter(prev=>({...prev,[ev.target.name]:ev.target.value}))
  // };

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
 
          <AppHeader />
        
          <main style={{position:"relative"}}>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyIndex />} path="/toy" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

