const ReadOnlyRow = ({ tableData, handleEditButton, handleRemoveButton }) => {
    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{tableData.field}</td>
            <td className="px-6 py-4">{tableData.type}</td>
            <td className="font-medium text-blue-600 hover:underline dark:text-blue-500"><button className="px-2" onClick={(event) => handleEditButton(event, tableData)}>Edit</button>|<button className="px-2" onClick={(event) => handleRemoveButton(event, tableData.id)}>Delete</button></td>
        </tr>
    )
}

export default ReadOnlyRow