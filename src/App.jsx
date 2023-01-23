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

    // while updating state we should not directly assign instead create new memory
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

  const handleEditButton = (event, id) => {
    event.preventDefault();
    setEditable(id);
  }

  return (
    <div>
      <form>
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
                  {editable === tableData.id ? <EditableRow key={tableData.id} /> : <ReadOnlyRow tableData={tableData} key={tableData.id} handleEditButton={handleEditButton} />}

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
