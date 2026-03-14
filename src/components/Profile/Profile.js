import React, { useState } from 'react';
import './index.css';
import { Col, Row } from 'antd';
import { profileOptions } from '../../constants';
import OptionDetails from './OptionDetails';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [optionDetails, setOptionDetails] = useState({});

    const openOptionDetails = (option) => {
        setOptionDetails({
            name: option.name,
            isOpen: true
        })
    }

    return (
        <div className='profile'>
            <div className='header'>
                <div className='name'>{user.name}</div>
                <div className='email'>{user.email}</div>
            </div>

            <div style={{padding: '20px', marginTop: '50px'}}>
                <Row justify={'center'} className='options'>
                    {profileOptions.map((option, id) => {
                        return (
                            <Col key={id} xs={8} className='option' onClick={() => openOptionDetails(option)}>
                                {option.icon}
                                <div style={{fontSize: '12px', textAlign: 'center', fontWeight: '500'}}>
                                    {option.name}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>

            <OptionDetails {...optionDetails} onClose={() => setOptionDetails({isOpen: false, option: ''})}/>
        </div>
    )
}

export default Profile