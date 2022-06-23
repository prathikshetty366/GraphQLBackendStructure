const graphql = require("graphql")
const _ = require("lodash")
const Book = require('../models/book')
const Author = require('../models/author')
const { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;//grab this object from graphql

//define Types (mostly like table which has name and object keys)
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        //connecting book with authour (creating relationship b/w two types)
        //authorId in books and id in author is same
        //when user hits book with author id , we are going to search that  id in authors
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return Author.findById(parent.authorId)
            }
        }
    }) //wrapping all the fileds in ES6 functions
})
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        //defining relation between author and Book
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

//Root Queries (this is which defines where user has to jump into to query the Data)
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        //Particular book with its id API
        book: {               //this is like Endpoint  we use to query in frontend
            type: BookType,
            args: { id: { type: GraphQLID } }, //to fetch particular data we need to pass arguments, (IN-REST-->endpoint/Books:id)
            resolve(parent, args) {
                //code to get data from db or other source
                return Book.findById(args.id);
            }
        },
        //author API
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        //All books API
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        }
    }
})
//mutation is where you add delelte and update the Data
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
})
//export the module
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
//Hierarchy
// -->Create Different Types
// -->Define RelationShip Between Them