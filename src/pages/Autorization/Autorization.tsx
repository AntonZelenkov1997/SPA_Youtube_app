import React, { FC, useState } from 'react';
import {
  Layout, Form, Input, Button, Row, Col, Typography, Icon,
} from 'antd';
import logo from '../../assets/autorization/sibdev-logo.png';
import updateMainComponent from '../../models/updateMainComponent';

const { Content } = Layout;
const { Title } = Typography;

const Autorization: FC = () => {
  const [statusVisible, setStatusVisible] = useState(false);
	const [blueColorIcon, setblueColorIcon] = useState(false);

  return (
		<div className="page">
			<Layout className="layout">
				<Content className="content">
					<Row className="row-first">
						<Col span={24} />
					</Row>

					<Row className="row-second">
						<Col span={6} className="column-first" />

						<Col span={12} className="column-second">
							<div className="container">
								<Form
									action="/search"
									className="form-autorization"
									onSubmit={(e) => {
										e.preventDefault();
										localStorage.setItem('isOnline', 'true');
										updateMainComponent();
									}}
								>
									<Form.Item className="form-autorization__logo">
										<img src={logo} alt="Not found" />
									</Form.Item>

									<Form.Item className="form-autorization__title">
										<Typography>
											<Title className="title">Вход</Title>
										</Typography>
									</Form.Item>

									<Form.Item className="form-autorization__username username">
										<label className="username__label">
											Логин
											<Input className="username__input" />
										</label>
									</Form.Item>

									<Form.Item className="form-autorization__password password">
										<label className="password__label">Пароль</label>
										<Input
											className="password__input"
											suffix={
												<Icon
													type={statusVisible ? 'eye' : 'eye-invisible'}
													onClick={() => {
														return setStatusVisible((prev) => !prev);
													}}
													className={blueColorIcon ? 'icon_active' : 'icon'}
													theme={blueColorIcon ? 'twoTone' : 'outlined'}
												/>
											}
											type={statusVisible ? 'text' : 'password'}
											onFocus={() => {
												setblueColorIcon(true);
											}}
											onBlur={() => {
												setblueColorIcon(false);
											}}
										/>
									</Form.Item>

									<Form.Item className="form-autorization__submit submit">
										<Button type="primary" htmlType="submit" className="submit__button">
											Войти
										</Button>
									</Form.Item>
								</Form>
							</div>
						</Col>

						<Col span={6} className="column-third" />
					</Row>

					<Row className="row-third">
						<Col span={24} className="column-first" />
					</Row>
				</Content>
			</Layout>
		</div>
  );
};

export default Autorization;
