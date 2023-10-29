import { useNavigate } from 'react-router-dom'
import * as auth from '../utils/Auth.js'
import { useFormAndValidation } from '../hooks/useFormAndValidation.js'
import iconFalse from '../images/false.png'

export default function Login({handleLogin, setEmail, onShowBadResault}) {

  const {values, handleChange, errors} = useFormAndValidation({email: '', password: ''})

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) { // если один из инпутов пустой
      return // вышли
    }
    auth.login(values.email, values.password).then((data) => {
      if (data.token) { // если все отлично
        localStorage.setItem('jwt', data.token)
        handleLogin() // передали
        setEmail(values.email)
        navigate('/main', {replace: true}) // перешли
      } else {
        return Promise.reject("Токен не предоставлен!")
      }
    }).catch((err) => {
      onShowBadResault({
        show: true,
        icon: iconFalse,
        text: err
      })
    })
  }

	return (
    <div className="auth" id="login">
      <div className="auth__container">
        <form className="edit-form" name="login" onSubmit={ handleSubmit }>
          <h2 className="edit-form__title edit-form__title_type_white">Вход</h2>
          <fieldset className="edit-form__set">
            <label className="edit-form__field">
              <input type="email" name="email" value={values.email || ""} onChange={ handleChange }  className="edit-form__input-text edit-form__input-text_type_grey" placeholder="Email"  required minLength="2" maxLength="40" id="email-input" />
              <span className={`edit-form__input-error email-input-error ${errors.email && "edit-form__input-error_active"}`}>{errors.email || ""}</span>
            </label>
            <label className="edit-form__field">
              <input type="password" name="password" value={values.password || ""} onChange={ handleChange }  className="edit-form__input-text edit-form__input-text_type_grey" placeholder="Пароль"  required minLength="6" maxLength="200" id="password-input" />
              <span className={`edit-form__input-error password-input-error" ${errors.password && "edit-form__input-error_active"}`} >{errors.password || ""}</span>
            </label>
            <button className="edit-form__button edit-form__button_type_white" type="submit" aria-label="Войти">Войти</button>
          </fieldset>
        </form>
      </div>
    </div>
	)
}