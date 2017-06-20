import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions/index'

class PostsIndex extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.fetchPosts();
  }
  renderPosts(){
    // lodash map works over object keys and returns an array of the values
    return _.map(this.props.posts, post => {
      return(
        <li key={post.id} className="list-group-item">{post.title}</li>
      )
    })
  }
  render(){
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new"> New Post </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { posts: state.posts }
}
// calling action creator directly instead of mapDispatchToProps... = same thing
export default connect(mapStateToProps, { fetchPosts })(PostsIndex)
