import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('renders log in form', () => {
            app.update()
            expect(app.exists('.loginFormContainer')).toBeTruthy()
        })

        it('doesn\'t render blogs', () => {
            app.update()
            expect(app.find(Blog).length).toEqual(0)
        })
    })

    describe('when user is logged in', () => {
        beforeEach(() => {
            const user = {
                name: 'Test User',
                username: 'test_user',
                token: '12345667889'
            }

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            app = mount(<App />)
        })

        it('renders all blogs', () => {
            app.update()
            expect(app.find(Blog).length).toEqual(blogService.blogs.length)
        })
    })
})