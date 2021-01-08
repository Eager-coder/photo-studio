import baseUrl from "../config"

export const register = async form => {
	const res = await fetch(`${baseUrl}/api/user/auth/register`, {
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

export const login = async form => {
	const res = await fetch(`${baseUrl}/api/user/auth/login`, {
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

export const checkToken = async () => {
	const res = await fetch(`${baseUrl}/api/user/auth/`, {
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})
	const { data } = await res.json()
	return { data, isSuccess: res.ok }
}

export const logout = async form => {
	const res = await fetch(`${baseUrl}/api/user/auth/`, {
		body: JSON.stringify(form),
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	const { message } = await res.json()
	return { message, isSuccess: res.ok }
}
