import { useEffect, useState } from "react"
import "./ProfileStyle.css"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
   const [profile, updateProfile] = useState({
      address: "",
      phoneNumber: 0,
      userId: 0
   })

   const [feedback, setFeedback] = useState("")

   const localHoneyUser = localStorage.getItem("honey_user")
   const honeyUserObject = JSON.parse(localHoneyUser)

    // TODO: Get employee profile info from API and update state
   useEffect(
      () => {
         const fetchData = async () => {
            const response = await fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            const customerObject= await response.json()
            updateProfile(customerObject[0])
         }
         fetchData()
      },
      []
   )

   useEffect(
      () => {
         if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
         }
      }, 
      [feedback]
   )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

       const putData = async () => {
         const response = await fetch(`http://localhost:8088/customers/${profile.id}`, {
            method : "PUT",
            headers : {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
         })
         .then(() => {
            setFeedback("Customer profile successfully saved")
        })
       }
       putData()
    }

    return ( <>
      <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
         {feedback}
      </div>
        <form className="profile">
            <h2 className="profile__title">Update Customer Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                              const copy = {...profile}
                              copy.address = evt.target.value
                              updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                              const copy = {...profile}
                              copy.phoneNumber = evt.target.value
                              updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
      </>
    )
}