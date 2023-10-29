export default function NavAuth (props) {
  return (
    <div className="header__navigator">
			{props.link 
					? <a href="./sign-up" className="header__navigator-link">Регистрация</a> 
					: <a href="./sign-in" className="header__navigator-link">Вход</a>
			} 
    </div>
  )
}