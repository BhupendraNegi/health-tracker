import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import AppRouter from '../components/AppRouter'


document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById("readings-element")
  ReactDOM.render(
    <AppRouter />,
    element
  )
}) 
