export function checkResponse(ok, res) {
	if (ok) {
		return res // если все окей, забираем данные в формате json
	} else {
		return Promise.reject(`Ошибка: ${res.message || res.error}`) // если ошибка, отклоняем промис
	}
}