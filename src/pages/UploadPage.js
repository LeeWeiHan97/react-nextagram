import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, FormText } from 'reactstrap';

class UploadPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFile: null,
      previewImage: null,
      message: ""
    }
  }

  handleFile = e => {
    if (e.target.files.length) {
      this.setState({
        previewImage: URL.createObjectURL(e.target.files[0]),
        imageFile: e.target.files[0]
      });
    }
  }

  handleUpload = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.imageFile);
    e.target.reset();
    axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
      .then(response => {
        if (response.data.success) {
          this.setState({
            message: "Image Uploaded Successfully!",
            previewImage: null,
            imageFile: null
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <>
        <div className="card" >
          {
            this.state.previewImage ? (
              <img
                src={this.state.previewImage}
                width="350px"
                height="350px"
              />
            ) : (
                <h3 className="text-center" >
                  {this.state.message ? this.state.message : "Live Preview"}
                </h3>
              )}
        </div >
        <Form onSubmit={
          this.handleUpload
        }>
          <FormGroup>
            <Input
              type="file"
              name="image-file"
              onChange={
                this.handleFile
              }
              multiple="false"
            />
            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
              </FormText>
          </FormGroup>
          <Button type="submit" color="primary">
            Upload
            </Button>
        </Form>
      </>
    )
  }
}

export default UploadPage;