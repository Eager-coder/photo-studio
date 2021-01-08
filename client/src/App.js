import { createContext, useState, useEffect } from "react"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import UserPage from "./pages/UserPage"
import AdminPage from "./pages/AdminPage"
import PricePage from "./pages/PricePage"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { checkToken } from "./api/user/auth"
import { AnimatePresence } from "framer-motion"
import PortfolioPage from "./pages/PortfolioPage"
import PorfolioSectionPage from "./pages/PorfolioSectionPage"

export const UserContext = createContext(null)

function App() {
	const [user, setUser] = useState({ isLoggedIn: false })

	useEffect(() => {
		checkToken().then(({ data, isSuccess }) => {
			if (isSuccess) setUser({ ...data, isLoggedIn: true })
		})
	}, [])
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<AnimatePresence exitBeforeEnter>
				<Router>
					<div className="App">
						<Nav user={user} setUser={setUser} />
						<main>
							<Switch>
								<Route exact path="/" component={HomePage} />
								<Route exact path="/login" component={LoginPage} />
								<Route exact path="/register" component={RegisterPage} />
								<Route exact path="/price" component={PricePage} />
								<Route exact path="/user">
									{user.isAdmin ? (
										<Redirect to="/admin/calendar" />
									) : (
										<UserPage />
									)}
								</Route>
								<Route path="/admin/:section" component={AdminPage} />
								<Route exact path="/portfolio" component={PortfolioPage} />
								<Route
									exact
									path="/portfolio/:section"
									component={PorfolioSectionPage}
								/>
							</Switch>
						</main>
						<Footer />
					</div>
					<GlobalStyle />
				</Router>
			</AnimatePresence>
		</UserContext.Provider>
	)
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
		box-sizing: border-box;
		font-family: 'Cormorant Garamond', serif;
	}
	body {
		background: whitesmoke;
	}
	h1 {
		font-family: 'Montserrat', sans-serif;
	}
	a {
		text-decoration: none;
	}
  ul {
    list-style: none;
  }
  main {
    padding: 0 50px;
    margin: auto;
  }
@media (max-width: 768px){
	main {
			padding: 0 20px;
	}
}
`
export default App
