import React, { FC, useState, useRef } from 'react';
import { Spin } from 'antd';
import HeaderBlock from '../../components/Header/Header';
import SearchResults from './SearchResults/SearchResults';
import SearchComponent from './SearchComponent/SearchComponent';
import connector from '../../store/actions';
import { ConnectorProps } from '../../models/types';

const Search: FC<ConnectorProps> = ({ statistics, videos }) => {
	const [spin, setSpin] = useState(false);
	
	const showResults = useRef(false);

	if (statistics) showResults.current = true;

	return (
		<Spin size="large" tip="Загрузка..." spinning={spin}>
			<HeaderBlock />
			{statistics || showResults.current ? (
				<SearchResults setSpin={setSpin} />
			) : (
				<SearchComponent setSpin={setSpin} />
			)}
		</Spin>
	);
};

export default connector(Search);
