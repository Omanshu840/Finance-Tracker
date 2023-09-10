import {Col, FloatButton, Row, message} from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {categories} from '../../constants';
import NewExpense from './NewExpense';
import CategoryDetails from './CategoryDetails';
import { connect } from 'react-redux';
import { addExpense } from '../../service';
import { AddExpense } from '../../actions';

const Expenses = (props) => {
    const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
    const [api, contextHolder] = message.useMessage();
    const [categoryDetails, setCategoryDetails] = useState({
        isOpen: false,
        category: ''
    });
    const [total, setTotal] = useState(0);
    const [categorySum, setCategorySum] = useState({});

    const expenses = props.expenses;

    useEffect(() => {
        if(expenses) {
            let total = 0;
            let categorySum = {};
            expenses.forEach(expense => {
                if(categorySum[expense.category]) {
                    categorySum[expense.category] += expense.amount;
                } else {
                    categorySum[expense.category] = expense.amount;
                }
                total += expense.amount;
            })
            setTotal(total);
            setCategorySum(categorySum)
        }
    }, [expenses])

    const onFinish = (formData) => {
        addExpense(formData.name, formData.amount, formData.category, formData.description, `${formData.date.$d}`)
        .then(response => {
            if(response.error) {
                api.open({
                    type: 'error',
                    content: response.error,
                });
            } else {
                setExpenseFormOpen(false)
                props.dispatch(AddExpense(response.expense))
            }
        })
    }

    const showCategoryDetails = (category) => {
        setCategoryDetails({
            isOpen: true,
            category,
            expenses: expenses.filter((item) => item.category===category)
        })
    }

    return (
        <div className='main'>
            {!expenses && <h1>Loading...</h1>}
            {expenses &&  <>
            <Row justify={'center'}>
                <Col className='summary' xs={12}>
                    <div style={{fontSize: '30px'}}>{total}</div>
                    <div>September</div>
                </Col>
            </Row>
            <Row justify={'space-evenly'} className='mt-50' gutter={[0, 24]}>
                {categories.map(category => {
                    return (
                        <Col className='category' xs={10} lg={7} onClick={() => showCategoryDetails(category)}>
                            <div
                                style={{fontSize: '20px', marginBottom: '5px', fontWeight: '600'}}
                            >
                                {categorySum[category] ? categorySum[category] : 0}
                            </div>
                            <div>{category}</div>
                        </Col>
                    )
                })} 
            </Row>
            {contextHolder}
            <NewExpense isExpenseFormOpen={isExpenseFormOpen} setExpenseFormOpen={setExpenseFormOpen} onFinish={onFinish}/>
            <CategoryDetails
                onClose={() => setCategoryDetails({isOpen: false, category: ''})}
                {...categoryDetails}
            />
            <FloatButton
                className='add-expense-btn'
                icon={<PlusOutlined/>}
                type="primary"
                onClick={() => setExpenseFormOpen(true)}
                style={{bottom: '100px', height: '50px', width: '50px', backgroundColor: 'var(--secColor2)'}}
            />
            </>}
        </div>
    )
}

const mapStateToProps = state => ({
	expenses: state.expenses
});

const mapDispatchToProps = dispatch => ({
	dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Expenses);