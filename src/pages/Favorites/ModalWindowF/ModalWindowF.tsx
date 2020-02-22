import React, { FC, useState, useRef } from 'react';
import { Modal, Form, Typography, Input, Select, Row, Col, Slider, InputNumber, Button } from 'antd';
import useForceUpdate from 'use-force-update';
import connector from '../../../store/actions';
import store from '../../../store/store';

const { Item } = Form;
const { Title } = Typography;
const { Option } = Select;

// ConnectorProps &

type IModalWindow = {
  visibleModal: any;
  setVisibleModal: any;
  video: any;
  index: number;
	actionEditFavorites?: any;
	favorites?: any;
	forceUpdate: any;
}

interface ITypeOfSort {
	value: string;
	title: string;
}

const typeOfSort: Array<ITypeOfSort> = [
	{
		value: 'date',
		title: 'Дате'
	},
	{
		value: 'rating',
		title: 'Рейтингу'
	},
	{
		value: 'relevance',
		title: 'Релевантности'
	},
	{
		value: 'title',
		title: 'Заголовку'
	},
	{
		value: 'videoCount',
		title: 'Количеству видео'
	},
	{
		value: 'viewCount',
		title: 'Количеству просмотров'
	}
];

interface IFavorites {
	q: string;
	name: null | string;
	order: string | null;
	countOfVideos: number | undefined;
}

const ModalWindowF: FC<IModalWindow> = ({
	actionEditFavorites,
	visibleModal,
	setVisibleModal,
	video,
	index,
	forceUpdate,
	favorites,
}) => {
	const modalForceUpdate = useForceUpdate();

	const [inputValue, setInputValue] = useState(video.countOfVideos);
	const [orderState, setOrderState] = useState(video.order);

	const refQuery = useRef<Input>(null);
	const refName = useRef<Input>(null);
	const refInputNumber = useRef<InputNumber>(null);

	return (
		<Modal
			visible={visibleModal[index]}
			centered={true}
			className="modalWindow"
			afterClose={() => forceUpdate()}
			onCancel={() => {
				const tempArr = visibleModal;
				tempArr[index] = false;
				setVisibleModal(tempArr);
				modalForceUpdate();
			}}
			footer={null}
			closable={false}
		>
			<Form className="form">
				<Item className="form__nameBlock nameBlock">
					<Title className="nameBlock__title">Сохранить запрос</Title>
				</Item>

				<Item className="form__queryBlock queryBlock">
					<Title className="queryBlock__title">Запрос</Title>
					<Input className="queryBlock__input" ref={refQuery} defaultValue={video.q} />
				</Item>

				<Item className="form__nameOfQueryBlock nameOfQueryBlock">
					<Title className="nameOfQueryBlock__title">
						<span style={{ color: 'red' }}>*</span> Название
					</Title>
					<Input
						className="nameOfQueryBlock__input"
						defaultValue={video.name}
						placeholder="Укажите название"
						ref={refName}
					/>
				</Item>

				<Item className="form__typeOfSortBlock typeOfSortBlock">
					<Title className="typeOfSortBlock__title">Сортировать по</Title>
					<Select
						className="typeOfSortBlock__input"
						placeholder="Без сортировки"
						size="large"
						defaultValue={video.order}
						onChange={(value: string) => setOrderState(value)}
					>
						{typeOfSort.map(({ value, title }: ITypeOfSort, index: number) => (
							<Option value={value} key={index.toString()}>
								{title}
							</Option>
						))}
					</Select>
				</Item>

				<Item className="form__countOfVideosBlock countOfVideosBlock">
					<Title className="countOfVideosBlock__title">Максимальное количество</Title>
					<Row className="row">
						<Col span={19} className="columnFirst">
							<Slider
								className="slider"
								min={1}
								max={50}
								onChange={(value) => setInputValue(Number(value))}
								value={typeof inputValue === 'number' ? inputValue : 1}
							/>
						</Col>
						<Col span={5} className="columnSecond">
							<InputNumber
								className="inputNumber"
								min={1}
								max={50}
								style={{ marginLeft: 16 }}
								value={inputValue}
								onChange={(value) => setInputValue(Number(value))}
								ref={refInputNumber}
								type="number"
								size="large"
							/>
						</Col>
					</Row>
				</Item>
				<Item className="form__footer footer">
					<Row className="row" gutter={[10, 0]}>
						<Col span={12} className="columnFirst">
							<Button
								type="primary"
								ghost
								className="cancelButton"
								onClick={() => {
									const tempArr = visibleModal;
									tempArr[index] = false;
									setVisibleModal(tempArr);
									modalForceUpdate();
								}}
							>
								Не сохранять
							</Button>
						</Col>
						<Col span={12} className="columnSecond">
							<Button
								type="primary"
								className="saveButton"
								onClick={() => {
									let obj = {
										order: orderState,
										name: refName.current!.state.value,
										countOfVideos: inputValue,
										q: refQuery.current!.state.value
									};

									actionEditFavorites(obj, favorites.length - index - 1);

									const tempArr = visibleModal;
									tempArr[index] = false;
									setVisibleModal(tempArr);
									modalForceUpdate();
								}}
							>
								Изменить
							</Button>
						</Col>
					</Row>
				</Item>
			</Form>
		</Modal>
	);
};

export default connector(ModalWindowF);
