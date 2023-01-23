const ReadOnlyRow = ({ tableData, handleEditButton }) => {
    return (

        <tr>
            <td>{tableData.field}</td>
            <td>{tableData.type}</td>
            <td><button onClick={(event) => handleEditButton(event, tableData.id)}>Edit</button></td>
        </tr>
    )
}

export default ReadOnlyRow