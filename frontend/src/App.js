import React, { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./global.css"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ShowInfo from "./pages/ShowInfo";
import Register from "./pages/Register";
import ProtectedRoute from './pages/ProtectedRoute'
import ErrorPage from "./pages/ErrorPage";

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    async function getData() {
      let result = await fetch('https://api.tvmaze.com/shows');
      let data = await result.json();
      setItems(data);
    }

    (async () => await getData())();
  }, [])

  const showName = (index) => {
    return items[index].name.replace(/\s/g, "-").toLowerCase()
  }

  return (
    <HashRouter>
      <main>
        <section>
          <Routes>
            <Route path={"/"} element={<Home />} />
            {items.map((item, index) => <Route key={index} path={showName(index)} element={<ShowInfo image={item.image.original} title={item.name} summary={item.summary} genres={item.genres} rating={item.rating.average} />} />)}
            <Route element={<ProtectedRoute />} >
              <Route path="/sign-in" element={<SignIn />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </section>
      </main>
    </HashRouter >
  )
}

export default App;