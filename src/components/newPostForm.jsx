import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class NewPostForm extends Component{

  renderField(field){
    // {...field.input} generates event handlers passed from the component
    return(
      <div className='form-group'>
        <label>{field.label}</label>
        <input className='form-control' type="text" {...field.input} />
      </div>
    )
  }
  render(){
    return(
      <form>
        <Field label="Post Title" name="title" component={this.renderField}/>
        <Field label="Tags" name="tags" component={this.renderField}/>
        <Field label="Content" name="content" component={this.renderField}/>
      </form>
    )
  }
}

export default reduxForm({
  form: 'NewPostForm'
})(NewPostForm)
