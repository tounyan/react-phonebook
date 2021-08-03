import React from 'react'

const successfulStyle = {
    background: 'lightgrey',
    color: 'green',
    border: '2px solid green',
    padding: 10,
    margin: 10
}

const failedStyle = {
    background: 'lightgrey',
    color: 'red',
    border: '2px solid red',
    padding: 10,
    margin: 10
}

const Notification = ({ message, isSuccessful }) => {
    if ( message == null ) return null
    if ( isSuccessful ) return <div style={successfulStyle}>{message}</div>
    return <div style={failedStyle}>{message}</div>
}

export default Notification