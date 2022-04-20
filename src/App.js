import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountForm from './components/AccountForm';
import AccountData from './components/AccountData';
import MatchTimeline from './components/MatchTimeLine';
import { Ring } from 'react-awesome-spinners'

const App = () => {
	const [name, setName] = useState('VonDrontti');
	const [playerInfo, setPLayerInfo] = useState('{}');
	const [rankedData, setRankedData] = useState([]);
	const [images, setImages] = useState([]);
	const [matches, setMatches] = useState([]);
	const [allMatchesPlayerData, setAllMatchesPlayerData] = useState([]);
	const [allMatchesTimeline, setAllMatchesTimeline] = useState([]);

	const searchForPlayer = (e) => {
		e.preventDefault();
		let puuid = '';
		axios
			.get(
				`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
			)
			.then((response) => {
				setPLayerInfo(response.data);
				puuid = response.data.puuid;
				return axios.get(
					`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.data.id}?page=1&api_key=${process.env.REACT_APP_RIOT_API_KEY}`
				);
			})
			.then((response) => {
				setRankedData(response.data[0]);
				return axios.get(
					`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${process.env.REACT_APP_RIOT_API_KEY}`
				);
			})
			.then((response) => {
				setMatches(response.data);
				return axios.get(`/${name}`).then((response) => {
					setImages(response.data.result);
				});
			});
	};

	useEffect(() => {
		matches.forEach((match) => {
			axios
				.get(
					`https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
				)
				.then((response) => {
					setAllMatchesPlayerData([
						...allMatchesPlayerData,
						response.data.info
					]);
				});
		});
		matches.forEach((match) => {
			axios
				.get(
					`https://europe.api.riotgames.com/lol/match/v5/matches/${match}/timeline?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
				)
				.then((response) => {
					setAllMatchesTimeline([...allMatchesTimeline, response.data]);
				});
		});
	}, [matches]);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	return (
		<>
			<AccountForm
				filter={name}
				onChange={(e) => handleNameChange(e)}
				onClick={(e) => searchForPlayer(e)}
			/>
			{playerInfo === '{}' ? (
				<p>No player data</p>
			) : (
				<>
					<AccountData playerData={playerInfo} rankedData={rankedData} />
				</>
			)}
			{images.length === 0 ? (
				<>
					{playerInfo !== '{}' ? 
						<>
							<p>Loading data</p>
							<Ring />
						</> 
						:
						<></>
					}
				</>
			) : (
				<>
					<p>Last {images.length} games </p>
					
					{Object.values(images).map((image, i) => {
						return <img src={`data:image/png;base64,${image}`} />;
					})}
				</>
			)}
		</>
	);
};

export default App;

// For fetching match data from flask api
/*return axios.get(`/${name}`).then(response =>{
        setImages(response.data.result)
      }) */
 // Continue: <MatchTimeline timelines={allMatchesTimeline} />