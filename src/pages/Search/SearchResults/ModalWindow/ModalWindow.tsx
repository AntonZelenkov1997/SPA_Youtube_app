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

interface IFavorites {
	q: string,
	name: null | string,
	order: string | null,
	countOfVideos: number | undefined,
};

const ModalWindow: FC<IModalWindow & ConnectorProps> = ({
	visibleModal,
	setVisibleModal,
	q,
	countOfVideos,
	actionSaveFavorites,
}) => {
	const [inputValue, setInputValue] = useState(12);
	const [order, setOrder]: [string, any] = useState('relevance');

	const refName = useRef<Input>(null);
	const refInputNumber = useRef<InputNumber>(null);

	let favorites: IFavorites = {
		q,
		name: null,
		order: 'relevance',
		countOfVideos
	};

	return (
		<Modal
			visible={visibleModal.visible}
			centered={true}
			destroyOnClose={true}
			className="modalWindow"
			onCancel={() => setVisibleModal({ visible: false, clicked: false })}
			footer={null}
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
					<Input className="nameOfQueryBlock__input" placeholder="Укажите название" ref={refName} />
				</Item>

				<Item className="form__typeOfSortBlock typeOfSortBlock">
					<Title className="typeOfSortBlock__title">Сортировать по</Title>
					<Select
						className="typeOfSortBlock__input"
						placeholder="Без сортировки"
						size="large"
						defaultValue="relevance"
						onChange={(value: string) => setOrder(value)}
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
								onChange={(value) => {
									setInputValue(Number(value));
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
								onChange={(value) => {
									setInputValue(Number(value));
								}}
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
									favorites = {
										...favorites,
										name: refName.current!.state.value,
										countOfVideos: refInputNumber.current!.props.value,
										order
									};
									actionSaveFavorites(favorites);
									setVisibleModal({ visible: false, clicked: true });
									setTimeout(() => setVisibleModal({ visible: false, clicked: false }), 2500);
								}}
							>
								Сохранить
							</Button>
						</Col>
					</Row>
				</Item>
			</Form>
		</Modal>
	);
};

export default connector(ModalWindow);
