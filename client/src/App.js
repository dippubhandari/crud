import './App.css';

function App() {
  const data = [
    { id: 1, name: "John Doe", age: 24, contact: "07123456789" },
    { id: 2, name: "Alice Smith", age: 29, contact: "07987654321" },
    { id: 3, name: "Michael Brown", age: 32, contact: "07876543210" },
    { id: 4, name: "Emma Wilson", age: 26, contact: "07765432109" }
  ];

  return (
    <div className="App">
      <h1 className="heading">CRUD APP</h1>

      {/* Dummy Form UI */}
      <div className="form-container">
        <input type='text' placeholder="Enter name" />
        <input type='number' placeholder="Enter age" />
        <input type='text' placeholder="Enter contact" />
        <button className="submit-btn">Add</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.contact}</td>
                <td>
                  <button className="update-btn">Update</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
