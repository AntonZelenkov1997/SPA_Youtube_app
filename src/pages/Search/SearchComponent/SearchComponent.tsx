import React, { FC } from 'react';
import { Layout, Input } from 'antd';
import { asyncActionGetSearchAndStatistics } from '../../../store/actionsThunk';
import store from '../../../store/store';

const { Content } = Layout;
const { Search } = Input;

type SearchComponentProps = {
	setSpin: any;
}

const SearchComponent: FC<SearchComponentProps> = ({ setSpin }) => {
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
							setSpin((prev: boolean) => !prev);
							store
								.dispatch(asyncActionGetSearchAndStatistics(q))
								.then(() => {
									console.log('Loading success!');
								})
								.catch((err: any) => console.log('Что-то пошло не так,', err));
						}}
					/>
				</div>
			</div>
		</Content>
	);
};


export default SearchComponent;
