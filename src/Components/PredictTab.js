import React from "react";
import axios from 'axios';
import './PredictTab.css';

class PredictTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageFile : null,
      image: [],
      predicted: null,
      imageData: null };
    this.filepickerHandler = this.filepickerHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetImageLoad = this.resetImageLoad.bind(this)
  }
  onSubmit(event){
    // const api = axios.create({
    //   baeURL:"localhost:5000"
    // })
    let formData = new FormData();
    formData.append('file',this.state.imageFile)
    axios.post("http://localhost:5000/dmz/prediction",formData,{
      headers: {
       'Content-Type': 'multipart/form-data',
       'accept' : 'application/json'
      }
   })
    .then(response =>{
      console.log(response.status)
      console.log(response.data)
      this.setState({predicted: response.data.predicted_class})
    })
    console.log('clicked predict')
    
  }
  resetImageLoad(event){
    this.setState({ imageFile : null,image: [],
      predicted: null, imageData: null });
    console.log('reset clicked')
  }
  filepickerHandler(event) {
    
    var file = this.refs.fileRef.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      var dataUrl = reader.result;
      /* if (file.type === "image/tiff") {
        console.log("inside if")
        try{
        var image = Image.load(dataUrl);
        dataUrl = image.toDataURL('image/png');
        } catch(error){
          console.error('Error loading TIFF image:', error);
        }
        try {
          dataUrl = convertTiffToPng(file);
          
        } catch (error) {
          console.error('Error converting TIFF to PNG:', error);
        }
      } */
      console.log("url on load");
      console.log(dataUrl);
      this.setState({imageFile: file,
        image: [reader.result],
        predicted: null,
        imageData : dataUrl
      })
    }.bind(this);
    console.log("Loading Done");
  }
  render() {
    return (
      <div className="PredictTab center-align">
        <div className="container-fluid">
          <div className="row">
            {/* <form id="predictSetup" name="predictForm" onSubmit={this.onSubmit}> */}
              <div className="center-align">
                <label className="filePickerLabel">Load Image</label>
                <input id="infileid" className="predPicker" type="file" ref="fileRef" onChange={this.filepickerHandler} />
              </div>
              <div className="center-align button-row">
                <div className="inlineBlock predictButtonBlc">
                  <button name="predict" id="predictbtn" type="submit" onClick={this.onSubmit}>
                    Predict
                  </button>
                </div>
                <div className="inlineBlock resetButtonBlck">
                  <button name="reset" id="resetbtn" type="reset" onClick={this.resetImageLoad}>
                    Reset
                  </button>
                </div>
              </div>
            {/* </form> */}
          </div>
          <div className="row center-align l-top-space">
            <div className="inlineBlock col-lg-6 col-md-6 col-sm-6">
              <img align="right" className={this.state.image.length ? 'img-visible' : 'not-visible'} src={this.state.imageData} alt="loaded for prediction" />
            </div>
            <div className="inlineBlock col-lg-6 col-md-6 col-sm-6">
              <div className={"center-align predicted-label " + (this.state.predicted === null ? 'not-visible' : 'lvl-visible')}> Predicted: </div>
              <div className={"center-align predicted-text " + (this.state.predicted === null ? 'not-visible' : 'lvl-visible')}> {this.state.predicted} </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
export default PredictTab;