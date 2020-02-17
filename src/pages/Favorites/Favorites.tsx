import React, { FC } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import HeaderSearch from '../../components/Header/Header';

const { Title } = Typography;
 
const Favorites: FC = () => {
  return (
		<>
			<HeaderSearch />
			<Row className="rowFavorite">
				<Col span={4} />
				<Col span={16} className="colFavorite">
					<div className="wrapper">
            <Title className="wrapper__title">Избранное</Title>
            
						<Typography className="wrapper__list">
							<Title className="title">Чем кормить кота</Title>
							<div className="buttons">
								<Button ghost className="buttons__execute">
									Выполнить
								</Button>
								<Button ghost className="buttons__edit">
									Изменить
								</Button>
								<Button ghost className="buttons__delete">
									Удалить
								</Button>
							</div>
            </Typography>
            
					</div>
				</Col>
				<Col span={4} />
			</Row>
		</>
  );
}

export default Favorites;
