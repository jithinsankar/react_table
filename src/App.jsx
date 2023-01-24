import './App.css'
import data from './mock-data.json'
import { useState } from 'react'
import ReadOnlyRow from './components/ReadOnlyRow'
import EditableRow from './components/EditableRow'
import { nanoid } from 'nanoid'
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

  const handleFormChange = (event) => {
    event.preventDefault();
    const inputName = event.target.getAttribute('name');
    const inputValue = event.target.value;

    // while updating state we should not directly assign instead create new memory as we should only use use set.. to update changes
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
  return (
    <div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>


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


      <div>
        <h1>Add more data</h1>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name='field' required='required' placeholder='Enter field' onChange={handleFormChange} />
          <input type="text" name='type' required='required' placeholder='Enter Type' onChange={handleFormChange} />
          <button>Add</button>
        </form>
      </div>
    </div>
  )
}

export default App
