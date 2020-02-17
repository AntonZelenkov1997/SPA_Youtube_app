import React, { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import connector from '../../../../store/actions';
import { ConnectorProps } from '../../../../models/types';
import ShowStatistics from './ShowStatistics';

const { Title } = Typography;

const VideosComponentList: FC<ConnectorProps> = ({ videos, statistics }) => (
	<div className="containerVideosList">
		{videos.map((video: any, index: number) => (
			<Row className="rowList">
				<Col span={4} />
				<Col span={16} className="columnList">
					<div className="wrapper">
						<img alt="Not found" className="wrapper__img" src={video.img} />
						<div className="wrapper__info info">
							<Title className="info__title">{video.title}</Title>
							<div>
								<Title className="info__channelTitle">{video.channelTitle}</Title>
								<Title className="info__statistics">
									<ShowStatistics nmb={statistics[index]} />
								</Title>
							</div>
						</div>
					</div>
				</Col>
				<Col span={4} />
			</Row>
		))}
	</div>
);

export default connector(VideosComponentList);
