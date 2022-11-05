import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
   const {customerId} = useParams()
   const [customer, updateCustomer] = useState([])

   useEffect(
      () => {
         const fetchData = async () => {
            const response = await fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            const singleCustomer = await response.json()
            updateCustomer(singleCustomer[0])
         }
         fetchData()
      }
   )

   return <section className="customer">
   <header className="cusomerupdateCustomer_header">{customer?.user?.fullName}</header>
   <div>Email: {customer?.user?.email}</div>
   <div>Phone Number: {customer.phoneNumber}</div>
   <div>Address: {customer.address}</div>
</section>
}