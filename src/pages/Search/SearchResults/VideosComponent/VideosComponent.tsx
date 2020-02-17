import React, { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import connector from '../../../../store/actions';
import { ConnectorProps } from '../../../../models/types';
import ShowStatistics from './ShowStatistics';

const { Title } = Typography;

const VideosGridComponent: FC<ConnectorProps> = ({ videos, statistics }) => {

	let countOfRows: Array<JSX.Element> = [];
	let countOfColumns: Array<JSX.Element> = [];

	const gridVideos = videos.map((video: any, index: number) => {

		countOfColumns.push(
			<Col className="column" span={4} key={String(index)}>
				<div className="wrapper">
					<img src={video.img} alt="Not found" className="wrapper__img" />
					<Title className="wrapper__title">
						{video.title.length > 30 ? `${video.title.slice(0, 30)}...` : video.title}
					</Title>
					<Title className="wrapper__channelTitle">
						{video.channelTitle.length > 30 ? `${video.channelTitle.slice(0, 30)}...` : video.channelTitle}
					</Title>
					<Title className="wrapper__statistics">
						<ShowStatistics nmb={statistics[index]} />
					</Title>
				</div>
			</Col>
		);
		
		if (((index + 1) % 4 === 0 && index !== 0) || index === videos.length - 1) {
				countOfRows[index === videos.length - 1 ? countOfRows.length : (index + 1) / 4 - 1] = (
					<Row className="row" type="flex" justify="start" gutter={20} key={String(index)}>
						<Col className="column" span={4} />
						{countOfColumns.map((elem: JSX.Element) => elem)}
						<Col className="column" span={4} />
					</Row>
				);
			countOfColumns = [];
		}

		return index === videos.length - 1 && countOfRows;
	});
	
		return (
			<div className="container">{gridVideos.map((rows: any) => rows)}</div>
		);
};

export default connector(VideosGridComponent);
