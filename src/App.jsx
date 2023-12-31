import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'


import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { DashBoard } from "./cmps/DashBoard.jsx"
import { store } from './store/store'
import './assets/style/main.scss'

import { useEffect, useState } from "react"
import { UserProfile } from "./pages/UserProfile.jsx"

export  function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
 
          <AppHeader />
        
          <main style={{position:"relative"}}>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<DashBoard />} path="/dashboard" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<UserProfile />} path="/user/:id" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

