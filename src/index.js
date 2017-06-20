import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { logger } from 'redux-logger';

// import App from './components/app';
import reducers from './reducers';

import PostsIndex from './components/postsIndex.jsx'
import NewPostForm from './components/newPostForm.jsx'

const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);


// React router <Switch> matches first route only, put more specific on top
ReactDOM.render(
  (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <Switch>
          <Route path="/posts/new" component={NewPostForm} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>
  ), document.querySelector('.container')
);
