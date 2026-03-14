import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Expenses from './components/Expenses/Expenses';
import { screens } from './constants';
import Balances from './components/Balances/Balances';
import Navigation from './components/Navigation';
import Login from './components/Login';
import { SetExpenses, SetLoading } from './actions';
import { message } from 'antd';
import Profile from './components/Profile/Profile';
import services from './services';

const App = (props) => {
	const {
		screen,
		dispatch,
		setLoading
	} = props;

	const [messageApi, contextHolder] = message.useMessage();
	const [activeDate, setActiveDate] = useState({
		month: (new Date()).getMonth(),
		year: (new Date()).getFullYear()
	})

	useEffect(() => {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add("dark-mode")
		}
		else {
			document.body.classList.add("light-mode")
		}
		window.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', event => {
				if(event.matches) {
					document.body.classList.add("dark-mode")
					document.body.classList.remove("light-mode")
				}
				else {
					document.body.classList.add("light-mode")
				document.body.classList.remove("dark-mode")
			}
		});
	}, [])

	useEffect(() => {
		setLoading(true);
		services.getExpenses(activeDate)
		.then(response => {
			if(response.expenses) {
				dispatch(SetExpenses(response.expenses))
			} else {
				error(response.error)
			}
		}).finally(() => {
			setLoading(false);
		})
	}, [activeDate])

	const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
        });
    };

	const handleMonthChange = (isBack) => {
		if(isBack) {
			if(activeDate.month === 0) {
				setActiveDate({
					year: activeDate.year - 1,
					month: 11
				})
			} else {
				setActiveDate({
					...activeDate,
					month: activeDate.month - 1
				})
			}
		} else {
			if(activeDate.month === 11) {
				setActiveDate({
					year: activeDate.year + 1,
					month: 0
				})
			} else {
				setActiveDate({
					...activeDate,
					month: activeDate.month + 1
				})
			}
		}
	}

	return (
    	<>
			{contextHolder}
			{(screen === screens.LOGIN) && <Login/>}
			{(screen !== screens.LOGIN) && 
				<>
					{(screen === screens.EXPENSES) &&
						<Expenses
							activeDate={activeDate}
							handleMonthChange={handleMonthChange}
						/>
					}
					{(screen === screens.ASSETS) && <Balances/>}
					{(screen === screens.PROFILE) && <Profile/>}
					<Navigation/>
				</>
			}
		</>
  	)
}


const mapStateToProps = state => ({
	isLoading: state.isLoading,
	screen: state.screen,
	expenses: state.expenses
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	setLoading: (isLoading) => dispatch(SetLoading(isLoading))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);