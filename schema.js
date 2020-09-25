const { fetchData, postData } = require('./api-callers');

const resolvers = {
    Query: {
        getAllCategories: () => fetchData('category/getAll'),
        getAllBlogs: () => fetchData('blogs/getAll')
    },
    Mutation: {
        addBlog: (parentValue, variables, context, info) => postData('addBlogs', variables),
        signupUser: (parentValue, variables, context, info) => postData('user/signup', variables),
        loginUser: (parentValue, variables, context, info) => postData('user/login', variables)
    }
};

const typeDefs = [`
    type Category {
        categoryId: Int
        categoryName: String
    }

    type Comment {
        commentId: Int
        user: User
        body: String
        blogId: Int
        subComments: Comment
    }
    
    type User {
        userId: ID
        firstName: String
        lastName: String
        mobileNo: String
        emailAddress: String
        penName: String,
        password: String
    }

    type Blog {
        blogId: ID
        title: String
        category: Category
        tags: [String]
        body: String
        appreciations: [User]
        Comments: [Comment]
        userId: Int
        date: String
        edited: Boolean
        lastEditedAt: String
    }


    input AddBlogInput {
        title: String
        category: String
        body: String
        tags: [String]
    }

    input AddUserInput {
        firstName: String
        lastName: String
        mobileNo: String
        emailAddress: String
        penName: String,
        password: String
    }

    input LoginUserInput {
        emailAddress: String,
        password: String
    }

    type Query {
        getAllBlogs: [Blog]
        getAllCategories: [Category]
    }

    type Mutation {
        addBlog(blog: AddBlogInput): Blog
        signupUser(user: AddUserInput): User
        loginUser(user: LoginUserInput): User
    }

    schema {
        query: Query,
        mutation: Mutation
    }
`];

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}