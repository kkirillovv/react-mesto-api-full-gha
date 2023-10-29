import React from 'react'
import { useNavigate } from "react-router-dom"

export default function NavBar (props) {

  const history = useNavigate();

  function signOut () {
    localStorage.removeItem('jwt')
    history('/sign-in')
  }

  return (
    <div className="header__navigator">
        <a href={"mailto:"+props.email} className="header__navigator-link">{props.email}</a>
        <a href="./" className="header__navigator-link header__navigator-link_type_grey" onClick={signOut}>Выход</a>
    </div>
  )
}