import React, { useState } from 'react';
import { connect } from 'react-redux';

const Friends = (props) => {
    const {
        friends
    } = props;

    return (
        <div className='friends p-10'>
            {friends && friends.map((friend, index) => {
                return (
                    <div key={`friend-${index}`} className='friend'>
                        <div className='friend-summary'>
                            <div>
                                <div>{friend.name}</div>
                                <div className='friend-total'>{friend.borrowed - friend.loaned}</div>
                            </div>
                            <div className='friend-items'>
                                <div className='amount'>{friend.loaned} Loaned</div>
                                <div>{friend.borrowed} Borrowed</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => ({
	users: state.users
});

const mapDispatchToProps = dispatch => ({
	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Friends);