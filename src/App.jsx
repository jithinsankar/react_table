import './App.css'
import data from './mock-data.json'
import { useState } from 'react'
import ReadOnlyRow from './components/ReadOnlyRow'
import EditableRow from './components/EditableRow'
import { nanoid } from 'nanoid'
import Highlight from 'react-highlight'
import "highlight.js/styles/github.css";
function App() {

  const [tableDatas, setTableDatas] = useState(data)
  const [field, setField] = useState({
    field: '',
    type: ''
  })
  const [editable, setEditable] = useState();
  const [editForm, setEditForm] = useState({
    field: '',
    type: ''
  })
  const [suffixPrompt, setSuffixPrompt] = useState('')

  const handleFormChange = (event) => {
    event.preventDefault();
    const inputName = event.target.getAttribute('name');
    const inputValue = event.target.value;

    // while updating state we should not directly assign instead create new memory as we should only use set.. to update changes
    const newFormData = { ...field }
    newFormData[inputName] = inputValue
    setField(newFormData)

  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newtableData = {
      id: nanoid(),
      field: field.field,
      type: field.type
    }
    const newtableDatas = [...tableDatas, newtableData]
    setTableDatas(newtableDatas)
  }

  const handleEditButton = (event, tableData) => {
    event.preventDefault();
    setEditable(tableData.id);
    setEditForm({ field: tableData.field, type: tableData.type })
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const inputName = event.target.getAttribute('name');
    const inputValue = event.target.value;
    const newFormData = { ...editForm }
    newFormData[inputName] = inputValue;
    setEditForm(newFormData)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const newTableDatas = [...tableDatas]
    const index = newTableDatas.findIndex((tableData) => tableData.id === editable)
    console.log("index", index)
    newTableDatas[index] = { id: editable, field: editForm.field, type: editForm.type }
    setTableDatas(newTableDatas)
    setEditable()

  }

  const handleEditCancel = (event) => {
    event.preventDefault();
    setEditable()
  }

  const handleRemoveButton = (event, id) => {
    event.preventDefault();
    const newTableDatas = [...tableDatas]
    const index = newTableDatas.findIndex((newtableData) => newtableData.id === id)
    newTableDatas.splice(index, 1)
    setTableDatas(newTableDatas)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tableDatas, suffixPrompt)

  }
  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-10 bg-white border-b dark:bg-gray-800 dark:border-gray-700">

        <div className='space-y-4'>
          {/* Add rows */}
          <div>
            <form onSubmit={handleFormSubmit} className="bg-white border-b px-6 py-3 md:space-x-4 flex flex-col md:flex-row dark:bg-gray-800 dark:border-gray-700">
              <input type="text" name='field' required='required' placeholder='Enter field' onChange={handleFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
              <input type="text" name='type' required='required' placeholder='Enter Type' onChange={handleFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
              <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </form>
          </div>
          {/* table */}
          <div className="relative overflow-x-auto rounded-lg border-gray-500 border">

            <form onSubmit={handleEditFormSubmit}>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Field
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                Sliver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
              $2999
              </td>
            </tr> */}
                  {
                    tableDatas.map((tableData) => (
                      <>
                        {editable === tableData.id ? <EditableRow handleEditFormChange={handleEditFormChange} tableData={tableData} handleEditCancel={handleEditCancel} /> : <ReadOnlyRow tableData={tableData} handleEditButton={handleEditButton} handleRemoveButton={handleRemoveButton} />}

                      </>

                    ))
                  }
                </tbody>
              </table>
            </form>
          </div>
        </div>

        {/* output */}
        <div className="py-2 px-4 mb-4 bg-white  dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" className="sr-only">Output comes here</label>
          {/* <textarea id="comment" rows="6"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Output comes here..." required></textarea> */}
          <Highlight language="sql" className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'>
            {`INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);`}
          </Highlight>

        </div>
        {/* prompt and button */}
        <div>
          <form onSubmit={handleSubmit}>

            <textarea name="promptbox" rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="prompt comes here..." required onChange={(e) => setSuffixPrompt(e.target.value)}></textarea>
            <div className='py-4'>

              <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit</button>
            </div>
          </form>

        </div>


      </div>
    </div>
  )
}

export default App
