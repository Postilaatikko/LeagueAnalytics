const AccountData = ({ playerData, rankedData }) => {
	return (
		<>
			<p>{playerData.name}</p>
			<img
				src={`http://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${playerData.profileIconId}.png`}
			/>
			<p>Level {playerData.summonerLevel}</p>
			<p>
				Tier {rankedData.tier} {rankedData.rank}
			</p>
			<p>Points {rankedData.leaguePoints}</p>
			<p>Wins {rankedData.wins}</p>
			<p>Losses {rankedData.losses}</p>
		</>
	);
};

export default AccountData;
