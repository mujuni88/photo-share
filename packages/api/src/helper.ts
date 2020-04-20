/* eslint-disable @typescript-eslint/camelcase */
import fetch from 'node-fetch'

export interface Credentials {
  client_id: string
  client_secret: string
  code: string
}

export interface Token {
  access_token: string
}

export interface GithubUser {
  message: string
  avatar_url: string
  login: string
  name: string
}

export enum URL {
  TOKEN = 'https://github.com/login/oauth/access_token',
  USER = 'https://api.github.com/user?access_token=',
}

export const requestGithubToken = async (
  credentials: Credentials
): Promise<Token> => {
  try {
    const resolve = await fetch(URL.TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    return await resolve.json()
  } catch (e) {
    throw new Error(JSON.stringify(e))
  }
}

export const requestGithubUserAccount = async (
  token: string
): Promise<GithubUser> => {
  const resolve = await fetch(`${URL.USER}${token}`)
  return await resolve.json()
}

export const authorizeWithGithub = async (
  credentials: Credentials
): Promise<GithubUser & Token> => {
  const { access_token } = await requestGithubToken(credentials)
  const githubUser = await requestGithubUserAccount(access_token)

  return { ...githubUser, access_token }
}
