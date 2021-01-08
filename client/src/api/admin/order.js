import baseUrl from "../config"

export const postOrder = async form => {
	const res = await fetch(`${baseUrl}/api/admin/order`, {
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
	const res = await fetch(`${baseUrl}/api/admin/order`, {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message, data } = await res.json()
	return { message, data, isSuccess: res.ok }
}
export const getCalendar = async () => {
	const res = await fetch(`${baseUrl}/api/admin/order/calendar`, {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { data } = await res.json()
	return { data, isSuccess: res.ok }
}

export const changeStatus = async (order_id, newStatus) => {
	const res = await fetch(`${baseUrl}/api/admin/order/status`, {
		method: "PUT",
		body: JSON.stringify({ order_id, newStatus }),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message } = await res.json()
	return { message, isSuccess: res.ok }
}

export const uploadUrl = async (order_id, imgUrl) => {
	const res = await fetch(`${baseUrl}/api/admin/order/upload_url`, {
		method: "POST",
		body: JSON.stringify({ order_id, imgUrl }),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message } = await res.json()
	return { message, isSuccess: res.ok }
}
