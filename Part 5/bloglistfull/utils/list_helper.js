const _ = require('lodash')

const dummy = (blogs) => {
    return(1)
  }

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }
    const maxLikes = Math.max.apply(Math, blogs.map( blog => blog.likes))
    return blogs.find( blog => blog.likes === maxLikes)
}

const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    return blogs.reduce( (s, p) => {
        return s + p.likes
    }, 0)
}

const authorGetter = (blog) => {
    return blog.author
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }
    var author = {
        author: undefined,
        blogs: 0
    }
    const count = _.countBy(blogs, authorGetter)
    _.forEach(count, (value, key) => {
        if(value > author.blogs){
            author.author = key
            author.blogs = value
        }
    })
    return author
}

const mostLikes = (blogs) => {
    var map = new Map([])
    if(blogs.length === 0){
        return undefined
    }
    var author = {
        author: undefined,
        likes: -1
    }
    blogs.forEach((blog) => {
        if(map.has(blog.author)){
            map.set(blog.author, map.get(blog.author) + blog.likes)
        }
        else{
            map.set(blog.author, blog.likes)
        }
    })
    map.forEach((value, key) => {
        if(value > author.likes){
            author.author = key
            author.likes = value
        }
    })
    return author
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }