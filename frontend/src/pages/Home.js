import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import './styles/home.css'
import backgroundImage from '../assets/pexels-tima-miroshnichenko-7991380.jpg'
import Card from "../components/Card";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      let result = await fetch('https://api.tvmaze.com/shows');
      let data = await result.json();
      setItems(data);
    }

    (async () => await getData())();
  }, [])


  return (
    <>
      <div
        className="background-div"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <Header />
        <div className="search">
          <h1 className="search__header">Search for your favourite TV show classics!</h1>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a TV show"
            type="search"
            className="search__bar"
          />
        </div>
      </div>
      <div className="content">
        <h1>TV Shows</h1>
        <h4>Click on the cards to see more info for each show.</h4>
        <div className="App">
          {items.map((item, index) => {
            if (searchQuery === "") {
              return (
                <Card key={index} image={item.image.original} title={item.name} rating={item.rating.average} language={item.language} duration={item.runtime} />
              );
            } else if (
              item.name
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(searchQuery.toLowerCase().replace(/\s/g, ""))
            ) {
              return (
                <Card key={index} image={item.image.original} title={item.name} rating={item.rating.average} language={item.language} duration={item.runtime} />
              );
            }
            else return null
          })}
        </div>
      </div>
    </>
  );
}
export default Home;
