import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

/* SIMULATE window.localStorage */
let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: key => savedItems[key],
    removeItem: key => {
        savedItems = savedItems.filter((k, v) => k !== key)
    },
    clear: savedItems = {}
}

window.localStorage = localStorageMock