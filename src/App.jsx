import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";

export default function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/:listid" element={<List />} />
         </Routes>
      </>
   );
}
