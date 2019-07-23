import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TeacherList from './TeacherList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      teachers: [],
      teacherName: '',
      teacherEmail: ''
    }
    this.handleTeacherNameChange = this.handleTeacherNameChange.bind(this)
    this.handleTeacherEmailChange = this.handleTeacherEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    var currentState= Object.assign({}, this.state)
    // console.log(this.state.teacherName)
    e.preventDefault()
    axios.post('/teachers', {
      name: currentState.teacherName,
      email: currentState.teacherEmail
    }).then((response) => {
      axios.get('/teachers').then((response) =>{
        this.setState({
          teachers: response.data
        })
      })
    })
  }
  handleTeacherNameChange(e) {
    this.setState({
      teacherName: e.target.value
    })
  }
  handleTeacherEmailChange(e){
    this.setState({
      teacherEmail: e.target.value
    })
  }
  componentDidMount() {
    axios.get('/teachers')
    .then(res => {
      this.setState({
        teachers: res.data
      })
    })
  }
  render() {
    return (
      <div className="App">
        <TeacherList teachers={this.state.teachers} 
                      handleTeacherNameChange={this.handleTeacherNameChange}
                      handleTeacherEmailChange={this.handleTeacherEmailChange}
                      name={this.state.teacherName}
                      email={this.state.teacherEmail}
                      handleSubmit = {this.handleSubmit}/>
      </div>
    )
  }

}

export default App;
