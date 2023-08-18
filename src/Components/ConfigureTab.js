import React from "react";
import axios from 'axios';
import './ConfigureTab.css';
class ConfigureTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedFile: null,
      message: null
    };
    this.filepickerHandler = this.filepickerHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetLoad = this.resetLoad.bind(this)
  }
  filepickerHandler(event) {
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({loadedFile: file
      })
    }.bind(this);
    console.log(url)
  }
  onSubmit(event){
    let formData = new FormData();
    formData.append('file',this.state.loadedFile)
    axios.post("http://localhost:5000/dmz/update_classifier_file",formData,{
      headers: {
       'Content-Type': 'multipart/form-data',
       'accept' : 'application/json'
      }
   })
    .then(response =>{
      console.log(response.status)
      console.log(response.data)
      this.setState({message: response.data.message})
    })
    .catch(({response})=>{
      console.log(response)
      if (response.status === 400) {
        this.setState({message: response.data.message})
      }
      else
      {
        this.setState({message: "Oops! Some error occured. Please try again later."})
      }
    })
    console.log('clicked model')
    
  }
  resetLoad(event){
    axios.get("http://localhost:5000/dmz/reset_classifier",{
      headers: {
       'accept' : 'application/json'
      }
   })
    .then(response =>{
      console.log(response.status)
      console.log(response.data)
      this.setState({message: response.data.message})
    })
    console.log('reset model')
    
  }
  render() {
    return (
      <div className="ConfigureTab center-align">
        <div className="container-fluid">
        <div className="row">
            {/* <form id="predictSetup" name="predictForm" onSubmit={this.onSubmit}> */}
              <div className="center-align">
                <label className="filePickerLabel">Load Model</label>
                <input id="infileid" className="loadPicker" type="file" ref="file" onChange={this.filepickerHandler} />
              </div>
              <div className="center-align button-row">
                <div className="inlineBlock predictButtonBlc">
                  <button name="predict" id="predictbtn" type="submit" onClick={this.onSubmit}>
                    Update Model
                  </button>
                </div>
                <div className="inlineBlock resetButtonBlck">
                  <button name="reset" id="resetbtn" type="reset" onClick={this.resetLoad}>
                    Reset Model
                  </button>
                </div>
              </div>
            {/* </form> */}
          </div>
          <div className= {"center-align l-top-space " + (this.state.message === null ? 'not-visible' : 'lml-visible')}>
          {this.state.message}
          </div>
        </div>
      </div>
    );
  }
};
export default ConfigureTab;