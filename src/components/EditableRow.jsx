const EditableRow = ({ handleEditFormChange, handleEditCancel, tableData }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" className="px-6 py-4 text-gray-800">
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" type="text" name='field' defaultValue={tableData.field} required='required' placeholder='Enter field' onChange={handleEditFormChange} />
            </td>
            <td className="px-6 py-4 text-gray-800">
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" type="text" name='type' defaultValue={tableData.type} required='required' placeholder='Enter Type' onChange={handleEditFormChange} />
            </td>
            <td className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                <button type="submit" className="px-2">Save</button> |
                <button type="button" className="px-2" onClick={handleEditCancel}>Cancel</button>

            </td>
        </tr>
    )
}

export default EditableRow