import baseUrl from "../config"

export const postMessage = async (text, order_id) => {
	const res = await fetch(`${baseUrl}/api/user/message`, {
		body: JSON.stringify({ text, order_id }),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message, data } = await res.json()
	return { message, data, isSuccess: res.ok }
}

export const deleteMessage = async message_id => {
	const res = await fetch(`${baseUrl}/api/user/message`, {
		method: "DELETE",
		body: JSON.stringify({ message_id }),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message } = await res.json()
	return { message, isSuccess: res.ok }
}
