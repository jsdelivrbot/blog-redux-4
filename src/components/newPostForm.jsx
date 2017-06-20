import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class NewPostForm extends Component{
  renderField(field){
    // pull meta from field, then pull touched and error from meta
    // like var meta = field.meta then var touched = meta.touched ...
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : '' }`
    // {...field.input} generates event handlers passed from the component
    return(
      <div className={className} >

        <label>{field.label}</label>

        <div className="text-help">
          {touched ? error : null}
        </div>

        <input className='form-control' type="text" {...field.input} />
      </div>
    )
  }
  onSubmit(values){
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    })
  }
  render(){
    // this comes from the reduxForm connecting to the component
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Post Title" name="title" component={this.renderField}/>
        <Field label="Categories" name="categories" component={this.renderField}/>
        <Field label="Content" name="content" component={this.renderField}/>
        <button className="btn btn-primary" type="submit">Submit</button>
        <Link to="/"className='btn btn-danger pull-right'>Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {};

  if (!values.title){
    errors.title = "Enter a title"
  }

  if (!values.categories){
    errors.categories = "Enter some categories"
  }

  if (!values.content){
    errors.content = "Enter content"
  }

  // if errors is empty, the form is fine to submit
  return errors;
}

export default reduxForm({
  form: 'NewPostForm'
  , validate
})(
  connect(null, {createPost})(NewPostForm)
)
