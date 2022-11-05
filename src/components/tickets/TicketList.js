import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    const {ticketId} = useParams()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
      () => {
        const searchedTickets = tickets.filter(ticket => ticket.description.startsWith(searchTermsState))
        setFiltered(searchedTickets)
      }, 
      [ searchTermsState ]
    )

    useEffect(
      () => {
        if (emergency) {
          const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
          setFiltered(emergencyTickets)
        }
        else {
          setFiltered(tickets)
        }
      },
      [emergency]
    )

    const getAllTickets = () => {
      const fetchTickets = async () => {
        const response = await fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        const ticketsArray = await response.json()
        setTickets(ticketsArray)
      }
      fetchTickets()
    }

    useEffect(
        () => {
          getAllTickets()
          
          const fetchEmployees = async () => {
            const response = await fetch(`http://localhost:8088/employees?_expand=user`)
            const employeeArray = await response.json()
            setEmployees(employeeArray)
          }
          fetchEmployees()
        },
        []
    )

    useEffect(
      () => {
        if(honeyUserObject.staff) {
          setFiltered(tickets)

        } else {
          const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
          setFiltered(myTickets)
        }

      }, [tickets]
    )

      useEffect(
        () => {
          if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
              return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
          } else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
          }
        },
        [openOnly]
      )

    return <>
    {
      honeyUserObject.staff
      ?<>
        <button onClick={ () => {setEmergency(true) } }>Emergency Only</button>
        <button onClick={ () => {setEmergency(false) } }>Show All</button>
      </>
      : <>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button> 
        <button onClick={() => updateOpenOnly(true)}>Open Tickets</button> 
        <button onClick={() => updateOpenOnly(false)}>All My Tickets</button> 
      </>
    }

    <h2>List of Tickets</h2>
    <article className="tickets">
      {
        filteredTickets.map(
          (ticket) => <Ticket employees={employees} 
            currentUser={honeyUserObject}
            getAllTickets={getAllTickets} 
            ticketObject={ticket} 
            key={`ticket--${ticket.id}`} />
        )
      }
    </article>
  </>
}
