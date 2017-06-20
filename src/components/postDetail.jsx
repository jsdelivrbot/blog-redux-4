import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostDetail extends Component{
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }
  handleDelete(){
    const {id} = this.props.match.params;
    // the params object is always available so no async probs with id
    this.props.deletePost(id, ()=>{
      this.props.history.push('/')
    })
  }
  render(){
    const { post } = this.props;
    if(!post){
      return <div>Loading...</div>
    } else {
      return(
        <div>
          <Link className="btn btn-primary" to='/'>Back to Index</Link>
          <button
            onClick={this.handleDelete.bind(this)}
            className='btn btn-danger pull-xs-right'
          >
            Delete
          </button>
          <h3>{post.title}</h3>
          <h6>tags: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
      )
    }
  }
}

function mapStateToProps({ posts }, ownProps){
  // own props is props in component
  return { post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost, deletePost })(PostDetail);
