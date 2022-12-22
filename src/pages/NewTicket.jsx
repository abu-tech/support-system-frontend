import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {createTicket, reset} from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {

  const {user} = useSelector(state => state.auth)
  const {isError, isSuccess, isLoading, message} = useSelector(state => state.tickets)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iphone')
  const [description, setDescription] = useState('')

  const ticketData = {
    product, 
    description
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate("/tickets")
      toast.success("Ticket Created!")
    }

    dispatch(reset())
  }, [isError, message, isSuccess, dispatch, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket(ticketData))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
    <BackButton url="/" />
    <section className="heading">
      <h1>Create New Ticket</h1>
      <p>Please fill out the form below</p>
    </section>
    <section className="form">
      <div className="form-group">
        <label htmlFor="name">Customer Name</label>
        <input type="text" className="form-control" value={name} disabled />
      </div>
      <div className="form-group">
        <label htmlFor="email">Customer Email</label>
        <input type="text" className="form-control" value={email} disabled />
      </div>
      <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="product">Select Product</label>
        <select name="product" id="product" value={product} onChange={e => setProduct(e.target.value)}>
          <option value="iphone">iphone</option>
          <option value="macbook pro">macbook pro</option>
          <option value="ipod">ipod</option>
          <option value="air pods">air pods</option>
        </select>
        <div className="form-group">
          <label htmlFor="description">Description of the Issue</label>
          <textarea className="form-control" name="description" id="description" rows="5" cols="30" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
        </div>
      </div>
      <div className="form-group">
        <button className="btn btn-block">Submit</button>
      </div>
      </form>
    </section>
    </>
  )
}

export default NewTicket