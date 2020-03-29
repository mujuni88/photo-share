import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { gql } from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useLocation, useHistory } from 'react-router-dom'
import { Me } from '../me/me'
import { USERS_QUERY } from '../../components/users'

export const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
      user {
        name
        githubLogin
      }
    }
  }
`
export const AuthorizedUser = () => {
  const [signingIn, setSignIn] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const [githubAuth, { data }] = useMutation(GITHUB_AUTH_MUTATION, {
      refetchQueries: [{query: USERS_QUERY}]
  })

  const requestCode = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`
  }

  useEffect(() => {
    const token = data?.githubAuth?.token
    if (token) {
      console.log('@@token', token)
      localStorage.setItem('token', token)
      history.replace('/home')
    }
  }, [data, history])

  useEffect(() => {
    function checkIn() {
      const { code } = queryString.parse(location.search)
      if (code) {
        console.log('@@code', code)
        githubAuth({ variables: { code } })
        setSignIn(true)
      }
    }

    checkIn()
  }, [githubAuth, location.search])

  return (
    <Me
      signingIn={signingIn}
      requestCode={requestCode}
    />
  )
}
