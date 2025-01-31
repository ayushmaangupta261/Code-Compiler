import { useRef } from "react"
import SignUp from "./components/Auth/SignUp"
import Template from "./components/Auth/Template"
import Navbar from "./components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "./redux/slices/authSlice"
import Home from "./pages/Home"




function App() {

  const modal = useSelector((state) => state.auth.modal);
  const dispatch = useDispatch();
  console.log("Modal value: ", modal);

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      dispatch(setModal(false));
    }
  }

  return (

    <div ref={modalRef} onClick={closeModal} className="h-[100vh] relative bg-[#13161B] ">

      <div className="fixed top-0 w-full z-10   ">
        <Navbar />
      </div>

      {modal && (<div className=" absolute w-[60%] z-10 left-1/2 top-10 transform -translate-x-1/2 backdrop-blur-2xl bg-opacity-40  ">
        <Template />
      </div>)}

   
        <Home />
    

    </div>
  )
}

export default App
