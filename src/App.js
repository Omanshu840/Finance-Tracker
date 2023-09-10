import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Expenses from './components/Expenses/Expenses';
import { screens } from './constants';
import Assets from './components/Assets';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import Login from './components/Login';
import { getExpenses } from './service';
import { SetExpenses } from './actions';
import { message } from 'antd';

const App = (props) => {
	const screen = props.screen;
	const expenses = props.expenses;
	const dispatch = props.dispatch;
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if(!expenses && screen === screens.EXPENSES) {
			getExpenses()
			.then(response => {
				if(response.expenses) {
					dispatch(SetExpenses(response.expenses))
				} else {
					error(response.error)
				}
			})
		}

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
	}, [screen])

	const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
        });
    };

	return (
    	<>
			{contextHolder}
			{(screen === screens.LOGIN) && <Login/>}
			{(screen !== screens.LOGIN) && 
				<>
					{(screen === screens.EXPENSES) && <Expenses/>}
					{(screen === screens.ASSETS) && <Assets/>}
					{(screen === screens.PROFILE) && <Profile/>}
					<Navigation/>
				</>
			}
		</>
  	)
}


const mapStateToProps = state => ({
	screen: state.screen,
	expenses: state.expenses
});

const mapDispatchToProps = dispatch => ({
	dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);