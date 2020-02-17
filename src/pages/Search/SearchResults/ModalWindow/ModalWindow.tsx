import React, { FC, useState, useRef } from 'react';
import { Modal, Form, Typography, Input, Select, Row, Col, Slider, InputNumber, Button } from 'antd';
import connector from '../../../../store/actions';
import { ConnectorProps } from '../../../../models/types';

const { Item } = Form;
const { Title } = Typography;
const { Option } = Select;

interface IModalWindow {
  visibleModal: {
    visible: boolean,
		clicked: boolean,
  },
	setVisibleModal: any,
}

interface ITypeOfSort {
  value: string,
  title: string,
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

const ModalWindow: FC<IModalWindow & ConnectorProps> = ({ visibleModal, setVisibleModal, q, countOfVideos }) => {

	const [inputValue, setInputValue] = useState(12);
	const [favorites, setFavorites]: any = useState({
		q,
		name: null,
		order: null,
		countOfVideos,
	});

	const refName = useRef<Input>(null);
	const refOrder: any = useRef<Select>(null);
	const refSlider = useRef<Slider>(null);

	// const favorites = {
	// 	q: queryBlockInputRef.current!.props.defaultValue,
	// 	name: nameOfQueryBlockRef.current!.state.value,
	// 	order: typeOfSortBlockRef,
	// 	countOfVideos: sliderRef.current!.props.value
	// };

	return (
		<Modal
			visible={visibleModal.visible}
			centered={true}
			className="modalWindow"
			onCancel={() => setVisibleModal({ visible: false, clicked: false })}
			footer={null}
			destroyOnClose={true}
			closable={false}
		>
			<Form className="form">
				<Item className="form__nameBlock nameBlock">
					<Title className="nameBlock__title">Сохранить запрос</Title>
				</Item>

				<Item className="form__queryBlock queryBlock">
					<Title className="queryBlock__title">Запрос</Title>
					<Input className="queryBlock__input" defaultValue={q} disabled />
				</Item>

				<Item className="form__nameOfQueryBlock nameOfQueryBlock">
					<Title className="nameOfQueryBlock__title">
						<span style={{ color: 'red' }}>*</span> Название
					</Title>
					<Input
						className="nameOfQueryBlock__input"
						placeholder="Укажите название"
						ref={refName}
						onChange={(e) => {
							// setFavorites({ ...favorites, name: e.target.value });
						}}
					/>
				</Item>

				<Item className="form__typeOfSortBlock typeOfSortBlock">
					<Title className="typeOfSortBlock__title">Сортировать по</Title>
					<Select
						className="typeOfSortBlock__input"
						placeholder="Без сортировки"
						size="large"
						defaultValue="relevance"
						ref={refOrder}
						onChange={(value: string) => /*setFavorites({ ...favorites, order: value })*/ null}
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
								ref={refSlider}
								onChange={(value) => {
									setInputValue(Number(value));
									// setFavorites({ ...favorites, countOfVideos: Number(value) });
								}}
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
									setVisibleModal(false);
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
									setVisibleModal({ visible: false, clicked: true });
									setTimeout(() => setVisibleModal({ visible: false, clicked: false }), 2500);
								}}
							>
								Сохранить
							</Button>
							<Button
								onClick={() => {
									console.log(refName, refOrder, refSlider);
								}}
							>
								Проверка
							</Button>
						</Col>
					</Row>
				</Item>
			</Form>
		</Modal>
	);
};

export default connector(ModalWindow);
