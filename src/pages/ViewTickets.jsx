import { useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {getAllTickets, reset} from '../features/ticket/ticketSlice'
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"

function ViewTickets() {
    const {tickets, isError, isSuccess, message, isLoading} = useSelector(state => state.tickets)
    const dispatch = useDispatch()


  useEffect(() => {
    return () => {
      if(isSuccess){
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    dispatch(getAllTickets())
  }, [isError, dispatch, message])


  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/"/>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>date</div>
          <div>product</div>
          <div>status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default ViewTickets