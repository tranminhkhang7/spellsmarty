import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import { useEffect } from "react";
const Login = () =>{

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(true);
	const [isDisabled, setIsDisabled] = useState(true);
	const navigate = useNavigate();

	useEffect(()=>{
		setIsDisabled(username === '' || password === '');
	},[username,password]);

	const handleLogin = () => {
		setIsDisabled(true);
		var axios = require('axios');
		var data = JSON.stringify({
			userName: username,
			password: password,
		});

		var config = {
			method: 'post',
			url: 'https://spellsmarty.azurewebsites.net/api/Auth/login',
			headers: {
			'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
		.then(function (response) {
			console.log(response);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('username', response.data.name);
			localStorage.setItem('role', response.data.role);
			navigate('/');
		})
		.catch(function (error) {
			console.log(error);
			setSuccess(false);
			setIsDisabled(false);
		});
	  };


	return (

			<body class="bg-white">

	{/* <!-- Example --> */}
	<div class="flex min-h-screen">

		{/* <!-- Container --> */}
		<div class="flex flex-row w-full">

		{/* <!-- Sidebar --> */}
		<div class='hidden bg-image bg-no-repeat bg-cover lg:flex flex-col justify-between g:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
			<div class="flex items-center justify-start space-x-3">
			<span class="bg-amber-300 rounded-full w-8 h-8"></span>
			<a href="/" class="font-bold text-3xl text-amber-300">Spell Smarty</a>
			</div>
			<div class='space-y-5'>
			<h1 class="text-orange-400 lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">Enter your account and discover new
				experiences</h1>
			<p class="text-lg text-white">You do not have an account?</p>
			<button
				class="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white transition duration-300 ease-out hover:-translate-y-1  hover:ease-in focus:-translate-y-1 focus:ease-in cursor-pointer"
				onClick={()=>navigate('/signup')}
				>Create account here</button>
			</div>
			<p class="font-medium text-amber-50">© 2023 Company</p>
		</div>

		{/* <!-- Login --> */}
		<div class="flex flex-1 flex-col items-center justify-center px-10 relative">
			<div class="flex lg:hidden justify-between items-center w-full py-4">
			<div class="flex items-center justify-start space-x-3">
				<span class="bg-black rounded-full w-6 h-6"></span>
				<a href="#" class="font-medium text-lg">Spell Smarty</a>
			</div>
			<div class="flex items-center space-x-2">
				<span>Not a member? </span>
				<a href="/signup" class="underline font-medium text-blue-700">
				Sign up now
				</a>
			</div>
			</div>
			{/* <!-- Login box --> */}
			<div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
			<div class="flex flex-col space-y-2 text-center">
				<h2 class="text-3xl md:text-4xl font-bold">Sign in to account</h2>
				<p class="text-md md:text-xl">Make sure that you already have an account!</p>
			</div>
			<div class="flex flex-col max-w-md space-y-5">
				{/* Username */}
				<label class="font-semibold text-2xl text-gray-600 pb-1 block">User Name</label>
				<input type="text" placeholder="Username"
				class="flex px-3 py-2 shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 rounded-lg font-medium placeholder:font-normal" 
				value={username}
				onChange={(e)=>setUsername(e.target.value)}
				/>
				{/* Password */}
				<label class="font-semibold text-2xl text-gray-600 pb-1 block">Password</label>
				<input type="password" placeholder="Password"
				class="flex px-3 py-2 shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
				/>
				<button 
				className={`flex items-center justify-center flex-none px-3 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white transition duration-300 ease-out hover:-translate-y-1  hover:ease-in focus:-translate-y-1 focus:ease-in  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
				onClick={handleLogin}
				>Login</button>
				{!success && <p className="font-semibold rounded-lg bg-red-300/50 p-2 text-red-500 text-lg text-center">Fail to login</p>}
				<div class="flex justify-center items-center">
				<span class="w-full border border-black"></span>
				</div>
				<div className="flex justify-center items-center">
					<button 
					className="flex w-full items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-primaryColor text-white transition duration-300 ease-out hover:-translate-y-1  hover:ease-in focus:-translate-y-1 focus:ease-in cursor-pointer"
					>
						Forgot password?
					</button>
				</div>
			</div>
			</div>

			{/* <!-- Footer --> */}
		</div>
		</div>

	</div>
	{/* <!-- Example --> */}
	</body>
	);
}

export default Login;