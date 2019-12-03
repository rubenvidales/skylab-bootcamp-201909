import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const { token } = sessionStorage

    return <>
      <Route exact path="/" render={() => token ? <Redirect to="/main" /> : <Landing />} />
    </>
})
