import React, { FC } from 'react';
import HeaderBlock from '../../components/Header/Header';
import SearchResults from './SearchResults/SearchResults';
import SearchComponent from './SearchComponent/SearchComponent';
import connector from '../../store/actions';
import { ConnectorProps } from '../../models/types';

const Search: FC<ConnectorProps> = ({ statistics }) => {

	return (
		<>
			<HeaderBlock />
			{statistics ? <SearchResults /> : <SearchComponent />}
		</>
	);
};

export default connector(Search);
