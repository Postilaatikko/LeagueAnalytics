import { useEffect, useState } from 'react';

const MatchTimeline = ({ timelines }) => {
	const [matchKills, setMatchKills] = useState([]);

	useEffect(() => {
		timelines.map((timeline) => {
			let timeLineKills = [];

			timeline['info']['frames'].map((frame) => {
				const events = frame['events'];

				events.map((event) => {
					if (event['type'] === 'CHAMPION_KILL') {
						timeLineKills.push(event);
					}
				});
			});
			setMatchKills((killXY) => [...killXY, timeLineKills]);
		});
	}, [timelines]);

	return (
		<>
			{matchKills.map((oneMatch) => {
				oneMatch.map((kill) => {
					return <p>{oneMatch}</p>;
				});
			})}
		</>
	);
};

export default MatchTimeline;
