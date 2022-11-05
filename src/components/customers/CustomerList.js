import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {
   const [customers, setCustomers] = useState([])

   useEffect(
      () => {
         const fetchData = async () => {
            const response = await fetch(`http://localhost:8088/users?isStaff=false`)
            const employeeArray = await response.json()
            setCustomers(employeeArray)
         }
         fetchData()
      },
      []
   
   )

   return <article className="customers">
      {
         customers.map(customer => <Customer key={`customer--${customer.id}`}
            id={customer.id} 
            fullName={customer.fullName} 
            email={customer.email}/>)
      }
   </article>
}