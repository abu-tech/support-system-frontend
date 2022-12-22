import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import { register, reset } from "../features/auth/authSlice"
import {useSelector, useDispatch} from 'react-redux'
import Spinner from "../components/Spinner"

function Register() {
  const [FormData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    password2:""
  });

  const {name, email, password, password2} = FormData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isSuccess, isError, isLoading, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if(password !== password2){
      toast.error("Password do not match!")
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  return (
    isLoading ? <Spinner /> : 
    <>
      <section className="heading">
        <h1><FaUser /> Register </h1>
        <p>Please create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={onChange} placeholder="Enter Your Name" required />  
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id="email" value={email} name="email" onChange={onChange} placeholder="Enter Your Email" required />  
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" value={password} name="password" onChange={onChange} placeholder="Enter Password" required />  
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password2" value={password2} name="password2" onChange={onChange} placeholder="Confirm Password" required />  
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register