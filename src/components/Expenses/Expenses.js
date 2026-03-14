import {Col, FloatButton, Row, Spin, message, Button} from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import {categories, monthNames} from '../../constants';
import NewExpense from './NewExpense';
import CategoryDetails from './CategoryDetails';
import { connect } from 'react-redux';
import { AddExpense, SetLoading } from '../../actions';
import services from '../../services';

const Expenses = (props) => {
    const {
        isLoading,
        setLoading,
        expenses,
        activeDate,
        handleMonthChange
    } = props;

    const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
    const [api, contextHolder] = message.useMessage();
    const [categoryDetails, setCategoryDetails] = useState({
        isOpen: false,
        category: ''
    });
    const [total, setTotal] = useState(0);
    const [categorySum, setCategorySum] = useState({});

    useEffect(() => {
        if(expenses) {
            let total = 0;
            let categorySum = {};
            const user = JSON.parse(localStorage.getItem('user'))
            expenses.forEach(expense => {
                expense.contributors.forEach(contributor => {
                    console.log(contributor._id, user._id);
                    if(contributor.user === user._id) {
                        categorySum[expense.category] = (categorySum[expense.category] || 0) + contributor.amount;
                        total += contributor.amount;
                    }
                })
            })
            setTotal(total);
            setCategorySum(categorySum)
        }
    }, [expenses])

    const onFinish = (formData) => {
        setExpenseFormOpen(false);
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'))
        const contributors = [{
            _id: user._id,
            amount: formData.amount
        }]
        services.addExpense(
            formData.name,
            formData.amount,
            formData.category,
            formData.description,
            `${formData.date.$d}`,
            contributors,
            user._id
        )
        .then(response => {
            if(response.error) {
                api.open({
                    type: 'error',
                    content: response.error,
                });
            } else {
                props.dispatch(AddExpense(response.expense))
            }
        })
        .catch(error => {
            api.open({
                type: 'error',
                content: "Couldn't process your request at the moment. Please try again later",
            })
        })
        .finally(() => {
            setLoading(false);
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
            <Spin spinning={isLoading} size='large' style={{maxHeight: '100vh', height: '90vh'}}>
                <Row justify={'center'}>
                    <Col className='summary-back'>
                        <Button
                            type={"primary"}
                            icon={<LeftOutlined />}
                            style={{width: '50px', height: '50px', margin: '10px'}}
                            onClick={() => handleMonthChange(true)}
                        />
                    </Col>
                    <Col className='summary' xs={12} md={8} lg={6}>
                        <div style={{fontSize: '30px'}}>{total}</div>
                        <div>{monthNames[activeDate.month]} {activeDate.year}</div>
                    </Col>
                    <Col className='summary-back'>
                        <Button
                            type={"primary"}
                            icon={<RightOutlined />}
                            style={{width: '50px', height: '50px', margin: '10px'}}
                            onClick={() => handleMonthChange(false)}
                        />
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
            </Spin>
        </div>
    )
}

const mapStateToProps = state => ({
	expenses: state.expenses,
    isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
	dispatch,
    setLoading: (isLoading) => dispatch(SetLoading(isLoading))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Expenses);