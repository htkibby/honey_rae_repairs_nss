import { useState } from "react"
import { useParams } from "react-router-dom"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
   const [searchTerms, setSearchTerms] = useState("")
   const {ticketId} = useParams()

   return <>
      <TicketSearch setterFunction={setSearchTerms} />
      <TicketList searchTermsState={searchTerms}/>
   </>
}