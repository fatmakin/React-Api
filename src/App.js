import axios from "axios";  //api den veri alma
import { useState, useEffect } from "react";  //  bileşenin durumu takip edilir ve bileşenin oluşturulması ve güncellenmesi sağlanır.
import BootstrapTable from "react-bootstrap-table-next"; //bu tablo özelleştirilebilir özellikler sunar 
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import './App.css'; 

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);


  //Apiden veri alma işlemi, api kontrolü
  const getData = async () => {
    try {
      const response = await axios("https://jsonplaceholder.typicode.com/comments");
      // const response = await axios("https://api-dev.massbio.info/assignment/query");    // get yapılamıyor
      setData(response.data);
    } catch (error) {
      console.error("Veri alınamadı. Hata:", error);
      setError("Veri alınamadı. Lütfen daha sonra tekrar deneyin.");
    }
  };

 
   //tablo sutün özellikleri ve filtreleme ,sıralama işlemleri
  const columns = [
    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter(),
      
      validator: (newValue, row, column) => (!isNaN(newValue) ? true : { valid: false, message: "Please enter a numeric value" }),
      headerClasses: 'custom-header'
    },
    { dataField: "postId", text: "Product ID", sort: true, filter: textFilter(), headerClasses: 'custom-header' },
    { dataField: "name", text: "Name", sort: true, filter: textFilter(), editable: false, headerClasses: 'custom-header' },
  ];
  return (
    

    <Container fluid className="App">
    <Row className="justify-content-center">
      <Col xs={12} md={8}>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          striped
          hover
          condensed
          pagination={paginationFactory()}
          cellEdit={cellEditFactory({ mode: "dbclick", blurToSave: true, nonEditableRows: () => [1, 2, 3] })}
          filter={filterFactory()}
          wrapperClasses="table-responsive"
          headerClasses="bg-primary text-white"
        />
      </Col>
    </Row>
    <Modal show={error} onHide={() => setError(null)} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Hata</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setError(null)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  </Container>
      
  );
}

export default App;
