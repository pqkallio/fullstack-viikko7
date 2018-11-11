import React from 'react'
import { mount, shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog, blogComponent

    beforeEach(() => {
        blog = {
            title: 'Test Title',
            author: 'Arthur Authoror',
            url: 'http://testurl.ts/blog',
            likes: 1,
            user: {
                name: 'Test User',
                username: 'test_user'
            }
        }

        const onUpdateMock = jest.fn()
        const onDeleteMock = jest.fn()
        const onExceptionMock = jest.fn()

        blogComponent = mount(
            <Blog
                blog={blog}
                onUpdate={onUpdateMock}
                onException={onExceptionMock}
                onDelete={onDeleteMock}
                username={blog.user.username}
            />
        )
    })

    it('renders only blogs name and author by default', () => {
        const togglable = blogComponent.find('Togglable')
        const labelDiv = togglable.find('.toggleLabel')
        const togglableDiv = togglable.find('.togglableContent')

        expect(labelDiv.text()).toContain(blog.title)
        expect(labelDiv.text()).toContain(blog.author)
        expect(togglableDiv.getElement().props.style).toEqual({ display: 'none' })
    })

    it('after clicking the details are displayed', () => {
        /* 
            I made this with enzyme's mount, since I needed to access
            the Togglable component. For some reason simulating click
            on the label div didn't change the content div's props.style
            object, but the change could be seen in the pure html, so
            I used it in stead when checking if the clicking does its
            job. Probably not the most orthodox way, but it worked.
        */
        const togglable = blogComponent.find('Togglable')
        const labelDiv = togglable.find('.toggleLabel')
        let togglableDiv = togglable.find('.togglableContent')
        
        expect(togglableDiv.html()).toContain('style="display: none;"')

        labelDiv.simulate('click')
        togglableDiv = togglable.find('.togglableContent')
        
        expect(togglableDiv.html()).toContain('style=""')
    })
})