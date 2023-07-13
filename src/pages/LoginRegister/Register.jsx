import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import { useEffect } from "react";
import image from "../../assets/big-logo-with-shadow.png"
const Register = () => {

	// main fields
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// warning checkers
	const [success, setSuccess] = useState(false);
	const [successError, setSuccessError] = useState(true);
	const [isDisabled, setIsDisabled] = useState(false);

	// validation checkers
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	const navigate = useNavigate();

	useEffect(() => {
		setSuccessError(true);
		setPasswordMatch(password === confirmPassword);
		setIsDisabled(email === '' || username === '' || fullname === '' || password === '' || password !== confirmPassword);
	}, [email, username, fullname, password, confirmPassword]);

	useEffect(() => {
		if (password === '') {
			setPasswordError('');
		}
		else if (passwordRegex.test(password)) {
			setPasswordError('');
		} else {
			setPasswordError('Passwords must be at least 8 characters long and must include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character!');
			setIsDisabled(true);
		}
	}, [password])

	useEffect(() => {
		if (username.length > 0 && username.length < 8) {
			setUsernameError('Username must be at least 8 characters long.')
		} else {
			setUsernameError('');
		}
	}, [username]);
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
			url: 'https://spellsmarty2.azurewebsites.net/api/Auth/signup',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				console.log("Signed up successfully!");
				setSuccess(true);
				const timeBuster = Date.now();
				navigate(`/signin?no=${timeBuster}`);
				//navigate('/');
			})
			.catch(function (error) {
				console.log(error);
				setSuccessError(false);
				setIsDisabled(false);
			});
	}


	return (

		<body class="bg-white">
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
		{!success?(
			<div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
			<div class="flex flex-col space-y-2 text-center">
				<h2 class="text-xl md:text-4xl font-bold">Sign up to account</h2>
				<p class="text-md md:text-xl">Check your email to verify the account!</p>
			</div>
			<div class="flex flex-col max-w-md space-y-5">
				{/* Username */}
				<label class="font-semibold text-xl text-gray-600 block">User Name</label>
				<span
					className={`text-white w-fit bg-red-400 text-xs py-2 px-2 text-left rounded-md ${
					usernameError != '' ? '' : 'hidden'
					}`}
					style={{ marginTop: '1%' }}
				>
				{usernameError}
				</span>
				<input type="text" placeholder="Username"
				class="flex px-3 py-2 text-lg shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 rounded-lg font-medium placeholder:font-normal" 
				value={username}
				onChange={(e)=>setUsername(e.target.value)}
				/>
				{/* Fullname */}
				<label class="font-semibold text-xl text-gray-600 pb-1 block">Fullname</label>
				<input type="text" placeholder="Fullname"
				class="flex px-3 py-2 text-lg shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={fullname}
				onChange={(e)=>setFullname(e.target.value)}
				/>
				{/* Email */}
				<label class="font-semibold text-xl text-gray-600 pb-1 block">Email</label>
				<input type="email" placeholder="Email"
				class="flex px-3 py-2 text-lg shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={email}
				onChange={(e)=>setEmail(e.target.value)}
				/>
				{/* Password */}
				<label class="font-semibold text-xl text-gray-600 block">Password</label>
				<span
					className={`text-white max-w-sm bg-red-400 text-xs py-2 px-2 text-left rounded-md ${
					passwordError != '' ? '' : 'hidden'
					}`}
					style={{ marginTop: '1%' }}
				>
				{passwordError}
				</span>
				<input type="password" placeholder="Password"
				class="flex px-3 py-2 text-lg shadow-lg focus:ring focus:ring-black md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" 
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
				/>
				{/* Confirm Password */}
				<label class="font-semibold text-xl text-gray-600 pb-1 block">Confirm Password</label>
				<input type="password" placeholder="Confirm Password"
				class={`flex px-3 py-2 text-lg shadow-lg focus:ring ${passwordMatch?'focus:ring-black':'focus:ring-red-400'} md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal`} 
				value={confirmPassword}
				onChange={(e)=>setConfirmPassword(e.target.value)}
				/>
				{!passwordMatch && <p className="text-red-400 font-semibold text-sm text-right" style={{ marginTop: '1%' }}>Passwords do not match!</p>}
				<button 
				className={`flex items-center justify-center flex-none text-xl px-3 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white transition duration-300 ease-out hover:-translate-y-1  hover:ease-in focus:-translate-y-1 focus:ease-in ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
				onClick={handleSignup}
				>Register</button>
				{!successError && <p className="font-semibold rounded-lg bg-red-300/50 p-2 text-red-500 text-lg text-center">Fail to sign up</p>}
			</div>
			</div>
		):(
			<div className="font-semibold">You have signed up successfully. Please check your email to verify your account!</div>
		)}
				</div>
			</div>
			</div>
		</body>


		// <div class="flex flex-col md:flex-row">
		// 	<div className="w-full md:w-1/2 left-side md:full-fit" style={{ padding: "0 60px" }}>
		// 		<img src={image} alt="Your Image" className="hidden md:block" />
		// 	</div>
		// 	<div class="w-full md:w-1/2 bg-gray-200" style={{ overflowY: "auto", height: "100vh" }}>
		// 		<section class="bg-gray-50 dark:bg-gray-900">
		// 			<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		// 				<a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
		// 					SpellSmarty
		// 				</a>
		// 				<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
		// 					<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
		// 						<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
		// 							Sign up
		// 						</h1>
		// 						<form class="space-y-4 md:space-y-6" action="#">
		// 							<div>
		// 								<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
		// 								<input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 
        //       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        //       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YourUsername"
		// 									required=""
		// 									value={username}
		// 									onChange={(e) => setUsername(e.target.value)}
		// 								/>
		// 							</div>
		// 							<div>
		// 								<label for="fullname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
		// 								<input type="text" name="fullname" id="fullname" class="bg-gray-50 border border-gray-300 text-gray-900 
        //       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        //       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your full name"
		// 									required=""
		// 									value={fullname}
		// 									onChange={(e) => setFullname(e.target.value)}
		// 								/>
		// 							</div>
		// 							<div>
		// 								<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
		// 								<input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 
        //       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        //       dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@johndoe.com"
		// 									required=""
		// 									value={email}
		// 									onChange={(e) => setEmail(e.target.value)}
		// 								/>
		// 							</div>
		// 							<div>
		// 								<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
		// 								<input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
		// 									value={password}
		// 									onChange={(e) => setPassword(e.target.value)} />
		// 							</div>
		// 							<div>
		// 								<label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
		// 								<input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
		// 									value={confirmPassword}
		// 									onChange={(e) => setConfirmPassword(e.target.value)} />
		// 							</div>
		// 							{!passwordMatch && confirmPassword ?
		// 								<p className="text-red-400 font-semibold text-sm text-right" style={{ marginTop: '1%' }}>Passwords do not match!</p>
		// 								:
		// 								<>
		// 								</>
		// 							}

								
		// 							<button
		// 								type="submit"
		// 								class="w-full text-white bg-primaryColor hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		// 								onClick={handleSignup}
		// 							>
		// 								Sign in
		// 							</button>
		// 							<p class="text-sm font-light text-gray-500 dark:text-gray-400">
		// 								You already have an account yet? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Log up</a>
		// 							</p>
		// 						</form>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</section>
		// 	</div>
		// </div>
	);
}

export default Register;