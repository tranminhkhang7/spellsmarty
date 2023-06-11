import React, { useEffect } from 'react';
import './SearchPage.css';
import Videos from '../../assets/videos';
import { useState } from 'react';
import VideoCard from '../../components/Search/VideoCard';
import Navbar from '../../components/Navbar/Navbar';

const SearchPage = () => {
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState(data);
	const [keyword, setKeyword] = useState('');
	const [level,setLevel] = useState('');

	var axios = require('axios');


	var config = {
		method: 'get',
		url: 'https://spellsmarty.azurewebsites.net/api/Video',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	useEffect(() => {
		axios(config)
			.then(function (response) {
				//console.log(JSON.stringify(response.data));
				// console.log(response.data);
				setData(response.data);
				setFilteredData(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});

	}, []);

	useEffect(() => {
		console.log(keyword);
		setFilteredData(data.filter(video => video.title.toLowerCase().includes(keyword.toLowerCase())));
	}, [keyword]);

	useEffect(()=>{
		setFilteredData(data.filter(video => video.level.includes(level)));
	}, [level]);

	const searchDynamic = (e) => {
		setKeyword(e.target.value);
	}

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(level);
		setFilteredData(data.filter(video => video.title.toLowerCase().includes(keyword.toLocaleLowerCase()) && video.level.includes(level)));
	}

	return (
		<>
			<Navbar />
			<div className='search-section'>
				{/* <div id="background-item"></div> */}
				<div className="flex items-center mb-4">
					<form action="/search" method="GET" className="w-full" onSubmit={handleSearch}>
						<div className="flex items-center border-2 content-center rounded-md mb-10">
							<input type="text"
								value={keyword}
								onChange={searchDynamic}
								placeholder="How America’s richest donate their money"
								className="px-4 py-2 w-full rounded-l-md  hover:border-grey-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center" />
							<button onClick={handleSearch}
								class="px-4 py-2 text-black rounded-r-md hover:bg-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500">
								Search
							</button>
						</div>
						<div className="flex items-center justify-between mb-4 ">
							<select className='w-1/5 px-4 py-2 rounded-md border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50'
								value={level}
								onChange={(e)=> setLevel(e.target.value)}
							>
								<option value="" disabled hidden selected>Level</option>
								<option value="">All</option>
								<option value="A1">A1</option>
								<option value="A2">A2</option>
								<option value="B1">B1</option>
								<option value="B2">B2</option>
								<option value="C1">C1</option>
							</select>

							<select className='w-1/5 px-4 py-2 rounded-md border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50'>
								<option value="" disabled selected hidden>Length</option>
								<option value="option1"> ~ 1 minutes</option>
								<option value="option2"> ~ 5 minutes</option>
								<option value="option3"> ~ 10 minutes</option>
								<option value="option3"> over 10 minutes</option>
							</select>

							<select name='category' className='w-1/5 px-4 py-2 rounded-md border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50'>
								<option value="" disabled selected hidden>Category</option>
								<option value="option1">Education</option>
								<option value="option2">Podcast</option>
								<option value="option3">Vlog</option>
							</select>

							<select className='w-1/5 px-4 py-2 rounded-md border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50'>
								<option value="" disabled selected hidden>Accent</option>
								<option value="option1">Option 1</option>
								<option value="option2">Option 2</option>
								<option value="option3">Option 3</option>
							</select>
						</div>
					</form>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{filteredData.map((video) => (
						<VideoCard
							srcId={video.srcId}
							videoId = {video?.videoid}
							thumbnail={video.thumbnailLink}
							//length={video.length}
							title={video.title}
							//channelAvatar={video.channel.avatar}
							channelName={video.channelName}
						//views={video.views}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default SearchPage;