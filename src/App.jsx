import React, { useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <header>
        <img src="./logo.svg" alt="reelvibe logo" />
        <img src="./hero-img.png" alt="reelvibe hero" />
        <h1>Find the Movies You'll Enjoy Without the Hassle.</h1>
      </header>

      <main>
        <section id="search">
          <Search search={search} setSearch={setSearch} />
        </section>
        <section id="trending">Trending</section>
        <section id="all-movie">All Movie</section>
      </main>
    </>
  );
};

export default App;
