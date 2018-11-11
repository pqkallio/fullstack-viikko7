let token = null

const blogs = [
    {
        "id": "5bc860b97e2e470299525e0d",
        "author": "misimäk",
        "title": "uutta",
        "url": "hui",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bc86268c6e28103ae0ba2ce",
        "author": "huih",
        "title": "Riks räks",
        "url": "hjhd",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bc862b6c6e28103ae0ba2cf",
        "author": "Homelius",
        "title": "Tein uuden blogin",
        "url": "makmak",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bc88d6baf58880671f02dc9",
        "author": "khhhhd",
        "title": "testimimoni",
        "url": "joih",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bc88f45baf2870704f23d14",
        "author": "authoori",
        "title": "Ihan oikean blogi",
        "url": "euioo",
        "likes": 28,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bc88f83baf2870704f23d15",
        "author": "Muoka",
        "title": "Testaten uusi blogi",
        "url": "https://apina.org/blogimogi",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bc8a8a0a6600207b15a70f0",
        "author": "Millen Collen",
        "title": "Microservices as an Architecture",
        "url": "https://apina.org/blogimogi",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bcc5928a6600207b15a70f2",
        "author": "Maagiikkoh",
        "title": "Maagian käätkössä",
        "url": "hththt",
        "likes": 1,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bcd541c8c4a984e213a46d6",
        "author": "Monetaria",
        "title": "Uus tette",
        "url": "ukiki",
        "likes": 2,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bcd818f8c4a984e213a46d8",
        "author": "Ripu Rapu",
        "title": "Belussa oli puolestaan...",
        "url": "dfjajla",
        "likes": 0,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    },
    {
        "id": "5bd290548b180a5d783b53aa",
        "author": "Mega Man",
        "title": "A very good blog",
        "url": "iuyiuh",
        "likes": 27,
        "user": {
            "_id": "5bd154ed1aef044c4c2eecca",
            "username": "test_user_zwei",
            "name": "Tist Uzer"
        }
    },
    {
        "id": "5bd295d88b180a5d783b53ab",
        "author": "Macmo",
        "title": "Test",
        "url": "ui",
        "likes": 0,
        "user": {
            "_id": "5bb32d920e5c683a0193fe25",
            "username": "test_user",
            "name": "Test User"
        }
    }
]

const setToken = newToken => token = newToken

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { blogs, getAll, setToken }
