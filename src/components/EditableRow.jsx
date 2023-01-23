const EditableRow = () => {
    return (
        <tr>
            <td>
                <input type="text" name='field' required='required' placeholder='Enter field' />
            </td>
            <td>
                <input type="text" name='type' required='required' placeholder='Enter Type' />
            </td>
            <td>
                <button >Submit</button>
            </td>
        </tr>
    )
}

export default EditableRow