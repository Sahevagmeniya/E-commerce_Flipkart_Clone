import React from "react";
import Navbar from "./components/Navbar";
import Routers from "./utility/Routers";

const App = () => {
  return (
    <div className="h-screen w-full bg-zinc-300">
      <Navbar />
      <Routers />
    </div>
  );
};

export default App;
