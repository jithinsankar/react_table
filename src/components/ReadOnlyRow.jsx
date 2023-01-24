const ReadOnlyRow = ({ tableData, handleEditButton, handleRemoveButton }) => {
    return (

        <tr>
            <td>{tableData.field}</td>
            <td>{tableData.type}</td>
            <td><button onClick={(event) => handleEditButton(event, tableData)}>Edit</button><button onClick={(event) => handleRemoveButton(event, tableData.id)}>Delete</button></td>
        </tr>
    )
}

export default ReadOnlyRow