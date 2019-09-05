const blogs = [
    {
        _id:"5d2c938ece69fb01edaec302",
        title:"Test",
        author:"Sergio Galán",
        url:"test1.com",
        likes:10,
        user:"5d2c9383ce69fb01edaec301",
        __v:0
    },
    {
        _id:"5d2c9b8edb1ff9032b6295c3",
        title:"Testdsaf",
        author:"Steasf",
        url:"test2.com",
        likes:10,
        user:"5d2c9383ce69fb01edaec301",
        __v:0
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }