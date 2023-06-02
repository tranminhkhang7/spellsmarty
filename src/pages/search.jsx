import React, { useEffect } from 'react';
import './Search.css';
import Videos from '../draftData/videos';
import { useState } from 'react';
import VideoCard from './VideoCard';

const SearchPage = () =>{
	const [data, setData] = useState(Videos);
	const [filteredData,setFilteredData] = useState(data);
	const [keyword, setKeyword] = useState('');
	
	useEffect(()=>{
		console.log(keyword);
		setFilteredData(data.filter(videos => videos.title.toLowerCase().includes(keyword.toLowerCase())));
	},[keyword]);

	const searchDynamic = (e) => {
		setKeyword(e.target.value);
	}

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(e.target.category);
		setFilteredData(data.filter(video => video.title.toLowerCase().includes(keyword.toLocaleLowerCase())));
	}

	return (
		<div className='search-form'>
		{/* <div id="background-item"></div> */}
		<div className="flex items-center mb-4">
			<form action="/search" method="GET" className="w-full" onSubmit={handleSearch}>
			<div className="flex items-center content-center rounded-r-md mb-10">
				<input type="text"
					value={keyword}
					onChange={searchDynamic}
					placeholder="How America’s richest donate their money" 
					class="px-4 py-2 w-full rounded-l-md border hover:border-grey-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center" />
				<button onClick={handleSearch}
					class="px-4 py-2 text-black rounded-r-md hover:bg-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500">
					Search
				</button>
			</div>
				<div className="flex items-center justify-between mb-4 ">
					<select className='w-1/5 px-4 py-2 rounded-md border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 '>
						<option value="" disabled selected hidden>Level</option>
						<option value="option1">A1</option>
						<option value="option1">A2</option>
						<option value="option1">B1</option>
						<option value="option2">B2</option>
						<option value="option3">C1</option>
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
					key={video.id}
					thumbnail={video.thumbnail}
					length={video.length}
					title={video.title}
					channelAvatar={video.channel.avatar}
					channelName={video.channel.name}
					views={video.views}
				/>
			))}
    	</div>
		</div>
	);
}

export default SearchPage;