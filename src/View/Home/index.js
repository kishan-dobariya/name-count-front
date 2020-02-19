import React, { Component } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from 'reactstrap'

const BASE_URL = 'http://localhost:3001/';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      counts: [],
      isLoading: false,
    }
  }

  handleUpload = () => {
    const { file } = this.state;

    if (!file) return alert('Please upload a name file');

    const formData = new FormData();
    formData.append('name', file, file.name);
    this.setState({ isLoading: true });
    axios.post(BASE_URL + 'counts', formData).then(response => {
      if (response && response.data && response.data.data) {
        this.setState({
          counts: Object.keys(response.data.data).map(x => ({ label: x, value: response.data.data[x] })).sort((a, b) => b.value - a.value),
          isLoading: false,
        });
      }

    }).catch(err => {
      this.setState({
        isLoading: false,
      });
      alert(err.message);
    });
  }

  onHandleSetFile = (e) => {
    const { target: { files } } = e;
    this.setState({ file: files[0] })
  }

  render() {
    const { counts, isLoading, } = this.state;

    return (
      <Card>
        <CardBody>
          <Form onSubmit={this.onHandleChange}>
            <Row style={{ alignItems: 'center' }}>
              <Col className="col-10">
                <FormGroup>
                  <Label for="exampleFile"><b>Upload a file</b></Label>
                  <Input
                    type="file"
                    accept=".txt"
                    name="file"
                    id="exampleFile"
                    onChange={(e) => this.onHandleSetFile(e)}
                  />
                </FormGroup>
              </Col>
              <Col className="col-2">
                <Button
                  color="success"
                  onClick={this.handleUpload}
                >
                  <b>Upload</b>
                </Button>
              </Col>
            </Row>
          </Form>
          {
            !isLoading
              ?
              <Table dark>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    counts.map((obj, index) => (<tr key={index}><td>{obj.label}</td><td><span style={{ marginLeft: 10 }}>{obj.value}</span></td></tr>))
                  }
                </tbody>
              </Table>
              : <h5>Loading...</h5>
          }
        </CardBody>
      </Card>
    )
  }
}

export default Home;
