import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import PostsActions from '../Redux/PostsRedux'
import CommentsActions from '../Redux/CommentsRedux'
import CurrentUserActions from '../Redux/CurrentUserRedux'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }

  // Discuss App start up actions
  // fix: this needs to go before posts actions
  // since the profile screen relies on it to filter posts,
  // but we should relegate the filtering to the API

  yield put(CurrentUserActions.getUsersRequest()) 
  yield put(PostsActions.getPostsRequest())
}
