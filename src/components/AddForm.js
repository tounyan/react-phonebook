import React from 'react'

const AddForm = (props) => {
    return (
        <>
            <form>
                <div>
                    Name: <input
                        value={props.newName}
                        onChange={props.handleNameInputChange}
                    />
                </div>
                <div>
                    Number: <input
                        value={props.newNumber}
                        onChange={props.handleNumberInputChange}
                    />
                </div>
                <div>
                    <button onClick={props.addOrUpdatePerson}>Add</button>
                </div>
            </form>
        </>
    )
}

export default AddForm