import NavBar from './NavBar.js'
import NavAuth from './NavAuth.js'

export default function Header(props) {
  if (props.isAuth !== false) {
    return (
      <header className="header">
        <div className="header__logo"></div>
        <NavBar email={props.email}/>
      </header> 
    )
  } else {
    return (
      <header className="header">
        <div className="header__logo"></div>
        <NavAuth link={props.currentLink}/>
      </header> 
    )      
  }
}