import React, { FC, useState } from 'react';
import { Row, Col, Input, Typography, Icon, Popover, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { asyncActionGetSearchAndStatistics } from '../../../store/actionsThunk';
import VideosComponentGrid from './VideosComponent/VideosComponent';
import connector from '../../../store/actions';
import { ConnectorProps } from '../../../models/types';
import store from '../../../store/store';
import ModalWindow from './ModalWindow/ModalWindow';
import VideosComponentList from './VideosComponent/VideosComponentList';

const { Search } = Input;
const { Title } = Typography;
const { Footer } = Layout;

const popoverContent = (
	<Typography>
		<Title className="popoverTitle">Поиск сохранен в разделе «Избранное»</Title>
		<Link to="/favorites">
			<Title className="popoverLink">Перейти в избранное</Title>
		</Link>
	</Typography>
);

const SearchResults: FC<ConnectorProps> = ({ totalResults, q }) => {
	const [activeFilter, setActiveFilter] = useState({
		filterBars: false,
		filterAppStore: true,
	});
	const [visibleModal, setVisibleModal] = useState({
		visible: false,
		clicked: false,
	});
	
	const modalWindowProps = {
		visibleModal,
		setVisibleModal,
	};

	const { filterBars, filterAppStore } = activeFilter;

		return (
			<>
				<ModalWindow {...modalWindowProps} />
				<Row className="rowFirst">
					<Col className="columnFirst" span={4} />

					<Col className="columnSecond" span={16}>
						<div className="topBlock">
							<Title className="topBlock__title">Поиск видео</Title>
							<Search
								className="topBlock__input"
								placeholder="Что хотите посмотреть?"
								enterButton="Найти"
								size="large"
								defaultValue={q}
								suffix={
									<Popover
										placement="bottom"
										content={popoverContent}
										visible={visibleModal.clicked}
										className="popover"
									>
										<Icon
											type="heart"
											className={`iconHeart`}
											theme={visibleModal.clicked ? 'twoTone' : 'outlined'}
											onClick={() => setVisibleModal({ visible: true, clicked: false })}
										/>
									</Popover>
								}
								onSearch={(q) => {
									store
										.dispatch(asyncActionGetSearchAndStatistics(q))
										.then((resolve: any) => {
											console.log('Ураааа, промис сработал:', resolve);
										})
										.catch((err: any) => console.log('Что-то пошло не так,', err));
								}}
							/>
						</div>
					</Col>

					<Col className="columnThird" span={4} />
				</Row>
				<Row className="rowSecond">
					<Col className="colFirst" span={4} />
					<Col className="colSecond" span={16}>
						<div className="topBlock">
							<Title className="topBlock__title">
								Видео по запросу: <b>«‎{q}»</b> <span>{totalResults}</span>
							</Title>
							<div className="topBlock__filterPanel filterPanel">
								<Icon
									type="bars"
									className={`filterPanel__bars ${filterBars ? `filterPanel__bars_active` : null}`}
									onClick={() => {
										setActiveFilter({ filterBars: true, filterAppStore: false });
									}}
								/>
								<Icon
									type="appstore"
									className={`filterPanel__appstore ${
										filterAppStore ? `filterPanel__appstore_active` : null
									}`}
									onClick={() => {
										setActiveFilter({
											filterBars: false,
											filterAppStore: true
										});
									}}
								/>
							</div>
						</div>
					</Col>
					<Col className="colThird" span={4} />
				</Row>
				{filterBars ? <VideosComponentList /> : <VideosComponentGrid />}
				<Footer />
			</>
		);
};

export default connector(SearchResults);
