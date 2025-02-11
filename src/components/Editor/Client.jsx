import React from 'react'
import Avatar from 'react-avatar'

const Client = ({ userName }) => {
    return (
        <div className='client flex flex-col justify-center items-center mt-3'>
            <Avatar name={userName} size={50} round="15px" />
            <span
                className="max-w-[100px] overflow-hidden text-ellipsis  whitespace-nowrap ">
                {userName}
            </span>
        </div>
    )
}

export default Client