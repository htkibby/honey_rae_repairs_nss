import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
   
    const [ticket, update] = useState({
      description: "",
      emergency: false
    })

    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const {ticketId} = useParams()

    useEffect(
      () => {
          const fetchData = async () => {
              const response = await fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
              const ticketsArray = await response.json()
              update(ticketsArray)
          }
          fetchData()
      },
      [ticketId]
  )

   const handleSaveButtonClick = (event) => {
        event.preventDefault()

         const ticketToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
         } 

         const putData = async () => {
            await fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
               method : "PUT",
               headers : {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(ticketToSendToAPI)
            })
            navigate("/tickets")
         }
         putData()
      }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                           (event) => {
                              const copy = {...ticket}
                              copy.description = event.target.value
                              update(copy)
                           }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                           (event) => {
                              const copy = {...ticket}
                              copy.emergency = event.target.checked
                              update(copy)
                           }
                        } />
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}