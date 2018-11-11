import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    let blog, blogComponent, mockHandler

    beforeEach(() => {
        blog = {
            title: 'Test Title',
            author: 'Arthur Authoror',
            likes: 1
        }

        mockHandler = jest.fn()

        blogComponent = shallow(
                            <SimpleBlog
                                blog={blog}
                                onClick={mockHandler} 
                            />
                        )
    })
    
    it('renders content', () => {
        const titleDiv = blogComponent.find('.blogTitle')
        const likeDiv = blogComponent.find('.blogLike')
    
        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)
        expect(likeDiv.text()).toContain(blog.likes.toString())
    })

    test('clicking the button multiple times calls event handler', () => {
        const button = blogComponent.find('button')

        for (let i = 1; i < 3; i++) {
            button.simulate('click')

            expect(mockHandler.mock.calls.length).toBe(i)
        }
    })
})