import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateStatus, createTodo, updateLocalStore } from "../stores/lists";
import { TbTrashFilled } from "react-icons/Tb";
import { IoMdCheckmark } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

export default function List() {
   const inputRef = useRef();
   const [list, setList] = useState({});
   const [isLoading, setIsloading] = useState(true);
   const [listError, setListError] = useState({
      message: "",
      status: false,
   });
   const params = useParams();
   const { lists } = useSelector((state) => state.lists);
   const dispatch = useDispatch();

   useEffect(() => {
      const findedList = lists.find((list) => list.id === params.listid);

      if (findedList) {
         setList(findedList);
         setIsloading(false);
      } else {
         setListError({
            message: "Liste bulunamadi",
            status: true,
         });
         setIsloading(false);
      }
   }, [lists, params.listid]);

   if (isLoading) {
      return <div>loading..</div>;
   }
   if (listError.status) {
      return <div>{listError.message}</div>;
   }

   const createHandle = () => {
      dispatch(createTodo({ text: inputRef.current.value, listid: list.id }));
      dispatch(updateLocalStore());
      inputRef.current.value = "";
   };

   const deleteHandle = (todoid) => {
      dispatch(updateStatus({ todoid, listid: list.id, status: 3 }));
      dispatch(updateLocalStore());
   };

   const complatedHandle = (todoid) => {
      dispatch(updateStatus({ todoid, listid: list.id, status: 2 }));
      dispatch(updateLocalStore());
   };

   const resumeHandle = (todoid) => {
      dispatch(updateStatus({ todoid, listid: list.id, status: 1 }));
      dispatch(updateLocalStore());
   };

   return (
      <div className="container h-full flex justify-center items-center">
         <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-medium rounded-sm text-dark py-3 p-5 border-[3px] border-yellowDark bg-yellow">{list.name}</h1>
            <div className="bg-blue border-[3px] flex flex-col border-blueDark p-5 rounded-sm text-white text-lg">
               <div className="flex mb-4 gap-2">
                  <input placeholder="Todo Text" className="text-dark rounded-sm px-1 py-0.5 outline-none" type="text" ref={inputRef} />
                  <button
                     onClick={createHandle}
                     className="bg bg-green hover:bg-greenDark transition-colors rounded text-sm px-3 py-1 ml-auto"
                  >
                     Create Todo
                  </button>
               </div>
               <ul>
                  {list.todos.map((todo, index) => {
                     if (todo.status === 0) {
                        return (
                           <li
                              className="flex items-center hover:bg-blueDark py-1 px-1 rounded-sm transition-colors cursor-pointer"
                              key={index}
                           >
                              <div className="w-3 h-3 rounded-full bg-light mr-1.5"></div>
                              <span>{todo.text}</span>
                              <button onClick={() => deleteHandle(todo.id)} className="ml-auto">
                                 <TbTrashFilled className="text-xl p-1 rounded-sm box-content transition-transform bg-light text-red hover:scale-110" />
                              </button>
                              <button onClick={() => complatedHandle(todo.id)}>
                                 <IoMdCheckmark className="text-xl p-1 rounded-sm box-content transition-transform ml-1 bg-light text-green hover:scale-110" />
                              </button>
                              <button onClick={() => resumeHandle(todo.id)}>
                                 <BsThreeDots className="text-xl p-1 rounded-sm box-content transition-transform ml-1 bg-light text-yellow hover:scale-110" />
                              </button>
                           </li>
                        );
                     }
                     if (todo.status === 1) {
                        return (
                           <li
                              className="flex items-center hover:bg-blueDark py-1 px-1 rounded-sm transition-colors cursor-pointer"
                              key={index}
                           >
                              <div className="w-3 h-3 rounded-full bg-yellow mr-1.5"></div>
                              <span>{todo.text}</span>
                              <button onClick={() => deleteHandle(todo.id)} className="ml-auto">
                                 <TbTrashFilled className="text-xl p-1 rounded-sm box-content transition-transform bg-light text-red hover:scale-110" />
                              </button>
                              <button onClick={() => complatedHandle(todo.id)}>
                                 <IoMdCheckmark className="text-xl p-1 rounded-sm box-content transition-transform ml-1 bg-light text-green hover:scale-110" />
                              </button>
                           </li>
                        );
                     }
                     if (todo.status === 2) {
                        return (
                           <li
                              className="flex items-center hover:bg-blueDark py-1 px-1 rounded-sm transition-colors cursor-pointer"
                              key={index}
                           >
                              <div className="w-3 h-3 rounded-full bg-green mr-1.5"></div>
                              <span>{todo.text}</span>
                           </li>
                        );
                     }
                     if (todo.status === 3) {
                        return (
                           <li
                              className="flex items-center hover:bg-blueDark py-1 px-1 rounded-sm transition-colors cursor-pointer"
                              key={index}
                           >
                              <div className="w-3 h-3 rounded-full bg-red mr-1.5"></div>
                              <span>{todo.text}</span>
                           </li>
                        );
                     }
                  })}
               </ul>
            </div>
         </div>
      </div>
   );
}
