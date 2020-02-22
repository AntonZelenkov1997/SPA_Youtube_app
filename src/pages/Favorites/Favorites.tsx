import React, { FC, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import useForceUpdate from 'use-force-update';
import HeaderSearch from '../../components/Header/Header';
import connector from '../../store/actions';
import { ConnectorProps } from '../../models/types';
import ModalWindowF from './ModalWindowF/ModalWindowF';
import { asyncCompleteFavorites } from '../../store/actionsThunk';
import store from '../../store/store';

const { Title } = Typography;
 
const Favorites: FC<ConnectorProps> = ({ favorites, actionDeleteFavorites, }) => {

	const objVisible = () => {
		return favorites.length === 0 ? null : favorites.map(() => false);
	};	
	
	const [visibleModal, setVisibleModal] = useState(objVisible());
	const forceUpdate = useForceUpdate();

	const history = useHistory();

	let reverseArray = [...favorites];
	reverseArray = reverseArray.reverse();

	return (
		<>
			<HeaderSearch />
			<Row className="rowFavorite">
				<Col span={4} />
				<Col span={16} className="colFavorite">
					<div className="wrapper">
						<Title className="wrapper__title">Избранное</Title>

						{favorites.length !== 0 ? (
							reverseArray.map((video: any, index: number) => (
								<span key={Math.random()}>
									<ModalWindowF
										visibleModal={visibleModal}
										setVisibleModal={setVisibleModal}
										video={video}
										index={index}
										forceUpdate={forceUpdate}
									/>
									<Typography className="wrapper__list">
										<Title className="title">{video.q}</Title>
										<div className="buttons">
											<Button ghost className="buttons__execute" onClick={() => {
												store
													.dispatch(asyncCompleteFavorites(index))
													.then((resolve: any) => {
														console.log('Ураааа, промис сработал:', resolve);
														history.push('/search');
													})
													.catch((err: any) => console.log('Что-то пошло не так,', err));;
											}}>
												Выполнить
											</Button>
											<Button
												ghost
												className="buttons__edit"
												onClick={() => {
													const tempArr = visibleModal;
													tempArr[index] = true;
													setVisibleModal(tempArr);
													forceUpdate();
												}}
											>
												Изменить
											</Button>
											<Button
												ghost
												className="buttons__delete"
												onClick={() => {
													actionDeleteFavorites(index);
													forceUpdate();
												}}
											>
												Удалить
											</Button>
										</div>
									</Typography>
								</span>
							))
						) : (
							<Title>У вас нет избранного :'(</Title>
						)}
					</div>
				</Col>
				<Col span={4} />
			</Row>
		</>
	);
};

export default connector(Favorites);
