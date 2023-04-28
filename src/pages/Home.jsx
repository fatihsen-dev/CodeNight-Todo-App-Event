import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList, updateLocalStore } from "../stores/lists";
import { NavLink } from "react-router-dom";

export default function Home() {
   const inputRef = useRef();
   const { lists } = useSelector((state) => state.lists);
   const dispatch = useDispatch();

   const createHandle = () => {
      dispatch(createList(inputRef.current.value));
      dispatch(updateLocalStore());
      inputRef.current.value = "";
   };

   return (
      <div className="container h-full flex flex-col justify-center items-center">
         <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-medium rounded-sm text-dark py-3 p-5 border-[3px] border-yellowDark bg-yellow">CodeNight Todo</h1>
            <ul className="bg-blue border-[3px] flex flex-col border-blueDark p-5 rounded-sm text-white text-lg">
               <div className="flex mb-4 gap-2">
                  <input placeholder="List Name" className="text-dark rounded-sm px-1 py-0.5 outline-none" type="text" ref={inputRef} />
                  <button
                     onClick={createHandle}
                     className="bg bg-green hover:bg-greenDark transition-colors rounded text-sm px-3 py-1 ml-auto"
                  >
                     Create List
                  </button>
               </div>
               {lists.map((list, index) => (
                  <NavLink
                     to={`/list/${list.id}`}
                     key={index}
                     className="hover:bg-blueDark transition-colors cursor-pointer px-2 py-0.5 rounded-sm"
                  >
                     {list.name}
                  </NavLink>
               ))}
            </ul>
         </div>
      </div>
   );
}
