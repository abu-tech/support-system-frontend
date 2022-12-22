import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import {getTicket, reset, closeTicket} from '../features/ticket/ticketSlice'
import {getNotes, createNote} from "../features/note/noteSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import NoteItem from "../components/NoteItem"

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }

  Modal.setAppElement("#root")

function Ticket() {
    const [noteText, setNoteText] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {isError, isSuccess, isLoading, message, ticket} = useSelector(state => state.tickets)
    const {notes, isLoading: notesIsLoading} = useSelector(state => state.notes)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if(isSuccess){
            return () => {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getTicket(params.id))
        dispatch(getNotes(params.id))
    }, [isError, message, dispatch, params.id])

    const onTicketClose = () => {
        dispatch(closeTicket(params.id))
        toast.success("Ticket Closed")
        navigate("/tickets")
    }

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onNoteSubmit = (e) => {
        e.preventDefault()
        // console.log(noteText)
        const id = params.id
        dispatch(createNote({id, noteText}))
        setNoteText("")
        closeModal()
    }

    if(isLoading || notesIsLoading){
        return <Spinner />
    }

  return (
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url="/tickets" />
            <h2>Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>Product: {ticket.product}</h3>
            <h4>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-IN')}</h4>
            <hr />
            <div className="ticket-desc">
                <h3>Description of the Issue</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
        </header>

        {ticket.status !== "closed" && (
            <button onClick={openModal} className="btn"><FaPlus /> Add Note</button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
            <h2>Add Note</h2>
            <button className="btn btn-close" onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea name="noteText" id="noteText" cols="30" rows="3" placeholder="Add a Note" className="form-control" value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </Modal>

        {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        ))}

        {ticket.status !== "closed" && (
            <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket