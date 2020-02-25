import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import logo from '../../assets/autorization/sibdev-logo.png';
import updateMainComponent from '../../models/updateMainComponent';

const { Header } = Layout;

const HeaderBlock: FC = () => {
	const { pathname } = useLocation();

  return (
		<Header className="header">
			<div className="navbar">
				<div className="leftSide">
					<Link to="/">
						<img src={logo} alt="Not found" className="leftside__logo" />
					</Link>
					<Link to="/search">
						<div className={`leftside__search ${pathname === '/search' && `leftside__search_active`}`}>
							Поиск
						</div>
					</Link>
					<Link to="/favorites">
						<div
							className={`leftside__favorites ${pathname === '/favorites' &&
								`leftside__favorites_active`}`}
						>
							Избранное
						</div>
					</Link>
				</div>
				<div className="rightSide">
					<div
						className="rightSide__exit"
						onClick={() => {
							localStorage.setItem('isOnline', 'false');
							updateMainComponent();
						}}
					>
						Выйти
					</div>
				</div>
			</div>
		</Header>
  );
};

export default HeaderBlock;
