import React from 'react'

export default function Logout() {
  return (
    <div>
      {sessionStorage.removeItem("userData")}
        {window.location.assign('/home')}
    </div>
  )
}
