import { useEffect } from "react";
import { useState } from "react";

const Signup = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(false);

	useEffect(() => {
		setPasswordMatch(password == confirmPassword);
	}, [confirmPassword]);

	return (
		<div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
			<div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
				<h1 class="font-bold text-center text-2xl mb-5">SpellSmarty</h1>
				<div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
					<div class="px-5 py-7">
						<label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
						<input type="email"
							className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:shadow-md focus:shadow-blue-300 focus:outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label class="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
						<input type="text"
							className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:shadow-md focus:shadow-blue-300 focus:outline-none"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label class="font-semibold text-sm text-gray-600 pb-1 block">Full Name</label>
						<input type="text"
							className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:shadow-md focus:shadow-blue-300 focus:outline-none"
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
						/>
						<label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
						<input type="text"
							className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:shadow-md focus:shadow-blue-300 focus:outline-none"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label class="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
						{!passwordMatch && <p className="text-red-400 text-sm text-right">Passwords do not match!</p>}
						<input type="text"
							className={`border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:shadow-md focus:outline-none 
										${passwordMatch ? 'focus:shadow-blue-300' : 'focus:shadow-red-400'}`}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button type="button" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
							<span class="inline-block mr-2">Login</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</button>
					</div>
					<div class="py-5">
						<div class="grid grid-cols-2 gap-1">
							<div class="text-center sm:text-left whitespace-nowrap">
								<button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
									</svg>
									<span class="inline-block ml-1">Forgot Password</span>
								</button>
							</div>
							<div class="text-center sm:text-right whitespace-nowrap">
								<button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
									<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block align-text-top">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
									</svg>
									<span class="inline-block ml-1">Sign in</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="py-5">
					<div class="grid grid-cols-2 gap-1">
						<div class="text-center sm:text-left whitespace-nowrap">
							<button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								<span class="inline-block ml-1">Back to home page</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;