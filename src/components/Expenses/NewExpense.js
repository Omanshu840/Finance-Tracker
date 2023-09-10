import React from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd'
import { categories } from '../../constants'


const NewExpense = (props) => {

    return (
        <div>
            <Modal
                open={props.isExpenseFormOpen}
                onOk={() => props.setExpenseFormOpen(false)}
                onCancel={() => props.setExpenseFormOpen(false)}
                footer={null}
            >
                <div style={{marginTop: '20px'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Add Expense</h2>
                    <Form layout='vertical' size='large' onFinish={props.onFinish}>
                        <Form.Item
                            name="name"
                            rules={[{
                                required: true,
                                message: "Expense name is required"
                            }]}
                        >
                            <Input placeholder='Expense Name'/>
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            rules={[{
                                required: true,
                                message: "Expense Amount is required"
                            }]}
                        >
                            <InputNumber
                                placeholder='Amount'
                                prefix="₹"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="description">
                            <Input placeholder='Expense Details'/>
                        </Form.Item>
                        <Form.Item
                            name="category"
                            rules={[{
                                required: true,
                                message: "Select expense category"
                            }]}
                        >
                            <Select
                                placeholder="Category"
                                options={
                                    categories.map(category => {return {value: category, label: category}})
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            rules={[{
                                required: true,
                                message: "Select date of expense"
                            }]}
                        >
                            <DatePicker style={{width: '100%'}} inputReadOnly disabledTime={true}/>
                        </Form.Item>
                        <Form.Item style={{textAlign: 'center', marginBottom: '10px'}}>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default NewExpense