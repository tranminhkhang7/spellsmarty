import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import { useEffect } from "react";
const Register = () =>{

	// main fields
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	
	// warning checkers
	const [success,setSuccess] = useState(true);
	const [isDisabled, setIsDisabled] = useState(false);

	// validation checkers
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const navigate = useNavigate();
	
	useEffect(() =>{
		setSuccess(true);
		setPasswordMatch(password === confirmPassword);
		setIsDisabled(email === '' || username === '' || fullname === '' || password === '' || password !== confirmPassword);
	},[email,username,fullname,password,confirmPassword]);

	useEffect(() =>{
		if(password === ''){
			setPasswordError('');
		}
		else if(passwordRegex.test(password)){
			setPasswordError('');
		}else{
			setPasswordError('Passwords must be at least 8 characters long and must include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character!');
			setIsDisabled(true);
		}
	},[password])

	useEffect(()=>{
		if(username.length > 0 && username.length <8){
			setUsernameError('Username must be at least 8 characters long.')
		}else{
			setUsernameError('');
		}
	},[username]);
	const handleSignup = () => {
		setIsDisabled(true);
		var axios = require('axios');
		var data = JSON.stringify({
			"userName": username,
			"password": password,
			"name": fullname,
			"email": email
		});

		var config = {
			method: 'post',
			url: 'https://spellsmarty.azurewebsites.net/api/Auth/signup',
			headers: { 
				'Content-Type': 'application/json', 
			},
			data : data
		};

		axios(config)
		.then(function (response) {
			console.log("Signed up successfully!");
			navigate('/');
		})
		.catch(function (error) {
			console.log(error);
			setSuccess(false);
			setIsDisabled(false);
		});
	}


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
			<a href="/" class="font-bold text-3xl text-amber-300 cursor-pointer">Spell Smarty</a>
			</div>
			<div class='space-y-5'>
			<h1 class="text-orange-400 lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">Create your account and discover new
				experiences</h1>
			<p class="text-lg text-white">You already have an account?</p>
			<button
				class="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white transition duration-300 ease-out hover:-translate-y-1  hover:ease-in focus:-translate-y-1 focus:ease-in cursor-pointer"
				onClick={()=>navigate('/signin')}
				>Log in here!</button>
			</div>
			<p class="font-medium text-amber-50">@ 2023 Company</p>
		</div>

		{/* <!-- Login --> */}
		<div class="flex flex-1 flex-col items-center justify-center px-10 relative">
			<div class="flex lg:hidden justify-between items-center w-full py-4">
			<div class="flex items-center justify-start space-x-3">
				<span class="bg-black rounded-full w-6 h-6"></span>
				<a href="/" class="font-medium text-lg cursor-pointer">Spell Smarty</a>
			</div>
			<div class="flex items-center space-x-2">
				<span>Already a member? </span>
				<a href="/signin" class="underline font-medium text-blue-700">
				Log in now
				</a>
			</div>
			</div>
			{/* <!-- Login box --> */}
			<div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
			<div class="flex flex-col space-y-2 text-center">
				<h2 class="text-3xl md:text-4xl font-bold">Sign up to account</h2>
				<p class="text-md md:text-xl">Check your email to verify the account!</p>
			</div>
			<div class="flex flex-col max-w-md space-y-5">
				{/* Username */}
				<label class="font-semibold text-2xl text-gray-600 block">User Name</label>
				<span
					className={`text-white w-fit bg-red-400 text-xs py-2 px-2 text-left rounded-md ${
					usernameError != '' ? '' : 'hidden'
					}`}
				>
				{usernameError}
				</span>
				<input type="text" placeholder="Username"
				class="flex px-3 py-2 shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 rounded-lg font-medium placeholder:font-normal" 
				value={username}
				onChange={(e)=>setUsername(e.target.value)}
				/>
				{/* Fullname */}
				<label class="font-semibold text-2xl text-gray-600 pb-1 block">Fullname</label>
				<input type="text" placeholder="Fullname"
				class="flex px-3 py-2 shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={fullname}
				onChange={(e)=>setFullname(e.target.value)}
				/>
				{/* Email */}
				<label class="font-semibold text-2xl text-gray-600 pb-1 block">Email</label>
				<input type="email" placeholder="Email"
				class="flex px-3 py-2 shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={email}
				onChange={(e)=>setEmail(e.target.value)}
				/>
				{/* Password */}
				<label class="font-semibold text-2xl text-gray-600 block">Password</label>
				<span
					className={`text-white max-w-sm bg-red-400 text-xs py-2 px-2 text-left rounded-md ${
					passwordError != '' ? '' : 'hidden'
					}`}
				>
				{passwordError}
				</span>
				<input type="password" placeholder="Password"
				class="flex px-3 py-2 shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
				/>
				{/* Confirm Password */}
				<label class="font-semibold text-2xl text-gray-600 pb-1 block">Confirm Password</label>
				<input type="password" placeholder="Confirm Password"
				class={`flex px-3 py-2 shadow-lg focus:ring ${passwordMatch?'focus:ring-black':'focus:ring-rose-700'} md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal`} 
				value={confirmPassword}
				onChange={(e)=>setConfirmPassword(e.target.value)}
				/>
				{!passwordMatch && <p className="text-rose-700 font-semibold text-sm text-right">Passwords do not match!</p>}
				<button 
				className={`flex items-center justify-center flex-none px-3 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white transition duration-300 ease-out hover:-translate-y-1  hover:ease-in focus:-translate-y-1 focus:ease-in ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
				onClick={handleSignup}
				>Register</button>
				{!success && <p className="font-semibold rounded-lg bg-red-300/50 p-2 text-red-500 text-lg text-center">Fail to sign up</p>}
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

export default Register;