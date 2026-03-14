import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, AutoComplete } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import { categories } from '../../constants'

const SplitExpense = (props) => {

    const {
        isOpen,
        setOpen,
        onFinish,
        users
    } = props;

    const steps = {
        ADD_MEMBERS: "ADD_MEMBERS",
        ADD_DETAILS: "ADD_DETAILS",
        ADD_SHARE: "ADD_SHARE"
    }

    const [step, setStep] = useState(steps.ADD_MEMBERS);
    const [contributors, setContributors] = useState([]);

    const [memberInput, setMemberInput] = useState("");
    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        setMemberInput(value);
        const suggestions = [];
        users.forEach(user => {
            if(user.email === value) {
                suggestions.push({
                    value: user._id,
                    label: user.name
                })
            }
        })
        setOptions(suggestions);
    };

    const addContributor = (suggestion) => {
        setMemberInput("");
        const contributor = {
            _id: suggestion.value,
            name: suggestion.label
        };
        setContributors((prevState) => {
            return [
                ...prevState,
                contributor
            ]
        })
        setOptions([]);
    }

    return (
        <div>
            <Modal
                className='split-expense-modal'
                open={isOpen}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div style={{marginTop: '20px'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Split Expense</h2>
                    {(step === steps.ADD_MEMBERS) &&
                        <div className='add-members'> 
                            <div className='contributors'>
                                {contributors.map((contributor, index) => {
                                    return (
                                        <div className='contributor'>{contributor.name}</div>
                                    )
                                })}
                            </div>
                            <AutoComplete
                                size='large'
                                style={{width: '100%'}}
                                onSearch={handleSearch}
                                placeholder="Add Members"
                                options={options}
                                value={memberInput}
                                onSelect={(value, option) => addContributor(option)}
                            />
                            <Button type="primary" onClick={() => setStep(steps.ADD_DETAILS)}>
                                Next
                            </Button>
                        </div> 
                    }
                    {(step === steps.ADD_DETAILS) &&
                        <Form layout='vertical' size='large' onFinish={onFinish}>
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
                            <Form.Item
                                name="category"
                                rules={[{
                                    required: true,
                                    message: "Select Paid By"
                                }]}
                            >
                                <Select
                                    placeholder="PaidBy"
                                    options={
                                        contributors.map(contributor => {return {value: contributor._id, label: contributor.name}})
                                    }
                                />
                            </Form.Item>
                            <Form.Item style={{textAlign: 'center', marginBottom: '10px'}}>
                                <Button type="primary" htmlType="submit">
                                    Add
                                </Button>
                            </Form.Item>
                        </Form>
                    }
                    {(step === steps.ADD_SHARE) &&
                        <div>Add Share</div>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default SplitExpense;