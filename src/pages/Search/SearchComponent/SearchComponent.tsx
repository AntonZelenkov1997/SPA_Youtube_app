import React, { FC } from 'react';
import { Layout, Input } from 'antd';
import { ConnectorProps } from '../../../models/types';
import connector from '../../../store/actions';
import asyncActionGetSearchAndStatistics from '../../../store/actionsThunk';
import store from '../../../store/store';

const { Content } = Layout;
const { Search } = Input;

const SearchComponent: FC<ConnectorProps>= () => {
	return (
		<Content className="content">
			<div className="container">
				<div className="searchForm">
					<div className="searchForm__title">Поиск видео</div>
					<Search
						className="searchForm__input"
						placeholder="Что хотите посмотреть?"
						enterButton="Найти"
						size="large"
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
			</div>
		</Content>
	);
};


export default connector(SearchComponent);
