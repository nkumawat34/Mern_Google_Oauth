import './App.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState } from 'react';
import RefrshHandler from './RefreshHandler';
//<RefrshHandler setIsAuthenticated={setIsAuthenticated} />
import NotFound from './NotFound';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId="390270155642-ikjqijafl9fkqhcg5ip6mhdddirihu2p.apps.googleusercontent.com">
			<GoogleLogin></GoogleLogin>
		</GoogleOAuthProvider>
	)
	const PrivateRoute = ({ element }) => {
	
		return isAuthenticated ? element : <Navigate to="/login" />
	}
	return (
		<BrowserRouter>
		    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
		   
			<Routes>
				<Route path="/login" element={<GoogleWrapper />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
				<Route path="*" element={<NotFound/>} />
			</Routes>
	</BrowserRouter>
	);
}

export default App