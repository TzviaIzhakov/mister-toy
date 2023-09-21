import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'


import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { store } from './store/store'
import './assets/style/main.css'

export  function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
         
          <main>
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

