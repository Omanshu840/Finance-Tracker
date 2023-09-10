import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { navItems } from '../constants'
import { connect } from 'react-redux'
import { ChangeScreenAction } from '../actions'

const Navigation = (props) => {
    return (
        <div className='bottom-navigation'>
            {navItems.map((item) => {
                const isActive = (item.name === props.screen);
                return (
                    <Button
                        type={isActive ? "primary" : ""}
                        shape="circle"
                        icon={item.icon}
                        style={{width: '50px', height: '50px'}}
                        onClick={() => props.dispatch(ChangeScreenAction(item.name))}
                    />
                )
            })}
        </div>
    )
}

const mapStateToProps = state => ({
	screen: state.screen
});

const mapDispatchToProps = dispatch => ({
	dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navigation);