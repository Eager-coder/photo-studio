import baseUrl from "../config"

export const postOrder = async form => {
	const res = await fetch(`${baseUrl}/api/user/order`, {
		body: JSON.stringify(form),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message, data } = await res.json()
	return { message, data, isSuccess: res.ok }
}

export const getOrders = async () => {
	const res = await fetch(`${baseUrl}/api/user/order`, {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message, data } = await res.json()
	return { message, data, isSuccess: res.ok }
}

export const cancelOrder = async order_id => {
	const res = await fetch(`${baseUrl}/api/user/order/${order_id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message } = await res.json()
	return { message, isSuccess: res.ok }
}
