import { useEffect } from 'react'
import * as auth from '../utils/Auth.js'
import { useFormAndValidation } from '../hooks/useFormAndValidation.js'
import iconTrue from '../images/true.png'
import iconFalse from '../images/false.png'

export default function Register({changeLink, onShowResault}) {

  const {values, handleChange, errors} = useFormAndValidation({email: '', password: ''})

  useEffect(() => {
    changeLink()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.email || !values.password) { // если один из инпутов пустой
      return // вышли
    }
    auth.register(values.password, values.email).then((res) => {
      onShowResault({
        show: true,
        icon: iconTrue,
        text: 'Вы успешно зарегистрировались!',
      })
    }).catch((err) => {
      onShowResault({
        show: true,
        icon: iconFalse,
        text: err,
      })
    })
  }

	return (
    <div className="auth" id="register">
      <div className="auth__container">
        <form className="edit-form" name="register" onSubmit={ handleSubmit }>
          <h2 className="edit-form__title edit-form__title_type_white">Регистрация</h2>
          <fieldset className="edit-form__set">
            <label className="edit-form__field">
              <input type="email" name="email" value={values.email || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_grey" placeholder="Email" required minLength="2" maxLength="40" id="email-input" />
              <span className={`edit-form__input-error email-input-error ${errors.email && "edit-form__input-error_active"}`}>{errors.email || ""}</span>
            </label>
            <label className="edit-form__field">
              <input type="password" name="password"  value={values.password || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_grey" placeholder="Пароль" required minLength="6" maxLength="200" id="password-input" />
              <span className={`edit-form__input-error password-input-error" ${errors.password && "edit-form__input-error_active"}`} >{errors.password || ""}</span>
            </label>
            <button className="edit-form__button edit-form__button_type_white" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
          </fieldset>
        </form>
        <p className="auth__note">Уже зарегистрированы? <a href="./sign-in" className="header__navigator-link">Войти</a></p>
      </div>
    </div>
	)
}