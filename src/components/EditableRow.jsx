const EditableRow = ({ handleEditFormChange, handleEditCancel, tableData }) => {
    return (
        <tr>
            <td>
                <input type="text" name='field' defaultValue={tableData.field} required='required' placeholder='Enter field' onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name='type' defaultValue={tableData.type} required='required' placeholder='Enter Type' onChange={handleEditFormChange} />
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleEditCancel}>Cancel</button>

            </td>
        </tr>
    )
}

export default EditableRow