import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import './index.scss';
import {Col, Row, Tabs} from 'antd'
import Friends from './Friends';
import { SetUsers } from '../../actions';
import services from '../../services';
import {FloatButton} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SplitExpense from './SplitExpense';

const Balances = (props) => {
	const {
		users,
		setUsers
	} = props;

	const [friends, setFriends] = useState([]);
	const [summary, setSummary] = useState({});
	const [isSplitExpenseOpen, setSplitExpenseOpen] = useState(false);

	useEffect(() => {
		services.getAllUsers()
		.then(response => {
			setUsers(response.users)
		})

		services.getFriends()
		.then((data) => {
			setFriends(data.friends);
		})
	}, [])

	useEffect(() => {
		let borrowed = 0, loaned = 0;
		friends.forEach(friend => {
			borrowed+=friend.borrowed;
			loaned+=friend.loaned;
		})
		setSummary({
			borrowed,
			loaned
		})
	}, [friends])

	const items = [
		{
		  key: 'friends',
		  label: 'Friends',
		  children: <Friends friends={friends}/>,
		},
		{
		  key: 'groups',
		  label: 'Groups',
		  children: 'Content of Tab Pane 2',
		}
	];

    return (
      	<div className='balances'>
			<Row justify={'center'}>
				<Col className='summary' xs={16}>
					<div className='total'>{summary.borrowed - summary.loaned}</div>
					<div className='items'>
						<div className='owes'>
							<div className='amount'>{summary.loaned}</div>
							<div className='text'>Loaned</div>
						</div>
						<div className='owed'>
							<div className='amount'>{summary.borrowed}</div>
							<div className='text'>Borrowed</div>
						</div>
					</div>
				</Col>
			</Row>
			<Tabs
				defaultActiveKey="friends"
				items={items}
				centered
			/>
			<FloatButton
                className='add-expense-btn'
                icon={<PlusOutlined/>}
                type="primary"
                onClick={() => setSplitExpenseOpen(true)}
                style={{bottom: '100px', right: '12px', height: '50px', width: '50px', backgroundColor: 'var(--secColor2)'}}
            />
            <SplitExpense
                isOpen={isSplitExpenseOpen}
                setOpen={setSplitExpenseOpen}
                onFinish={() => {}}
                users={users}
            />
		</div>
    )
}

const mapStateToProps = state => ({
	users: state.users
});

const mapDispatchToProps = dispatch => ({
	setUsers: (users) => dispatch(SetUsers(users))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Balances);