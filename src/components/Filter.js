import React from 'react'

const Filter = (props) => {
    return (
        <div>
        <form>
            Keyword: <input
                value={props.newFilter}
                onChange={props.handleFilter}
            />
        </form>
      </div>
    )
}

export default Filter