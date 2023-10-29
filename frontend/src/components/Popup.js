import { useEffect } from "react"
 
const Popup = ({ isOpened, name, onClose, children }) => {

// внутри указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpened) return
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeByEscape)
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape)
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpened, onClose])

	// создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

	// внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`. 
  return (
		<div className={isOpened ? `popup popup_opened` : `popup`} id={`${name}`} onClick={handleOverlay}>  
			<div className="popup__container popup__container_edit-form">
				<button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
				{children}
      </div>
    </div>
  )
}

export default Popup;