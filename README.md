# Root & Rise


### **Project Overview**

**Root & Rise** is a community-driven platform designed for gardening enthusiasts and professionals to connect, learn, and share knowledge about gardening. This web application serves as a space for users to explore gardening tips, seasonal guides, plant care, and techniques to enhance their gardening experiences. With a focus on sustainability, well-being, and fostering community, Root & Rise empowers gardeners of all levels to share their insights and grow their skills.

Root & Rise offers interactive features like **content creation tools**, **user profiles**, **community engagement**, and **premium content access through payments**, creating a rich environment for users to participate in and explore gardening culture. The platform encourages social interaction through features like following other users, commenting, and upvoting content, creating a vibrant gardening network.

---

### **Core Project Objectives**

1. **Full-stack web application** using Next.js, TypeScript, MongoDB, Express, and Node.js.
2. **JWT-based authentication** for secure user login, registration, and profile management.
3. **Responsive design** optimized for mobile and desktop devices.
4. **Social features** including upvoting, commenting, following users, and displaying popular content.
5. **Rich text editor** for users to create and share detailed gardening tips, including images and videos.
6. **Payment integration** (e.g., Stripe or AmarPay) for accessing premium gardening resources.
7. **Advanced search and filter** options for users to find relevant content by category, popularity, and more.
8. **Admin dashboard** for managing users, posts, payments, and content moderation.

#### Required Pages:

- **Login/Registration Page:** User sign-up and login with secure authentication.
- **User Dashboard:** Personalized content display, followers, and followed users.
- **Admin Dashboard:** Management of users, posts, and payment history with monthly analytics.
- **Profile Page:** Allows users and admins to view and edit profiles, posts, followers, and followees.
- **News Feed:** Displays posts from users, with filtering options by category.
- **About Us Page:** Information on the project’s mission and vision.
- **Contact Us Page:** Contact form or details for user inquiries and support.
- **Image Gallery Section:** A showcase of recent gardening images.

### **API Endpoints**

> ### Auth
>
> - POST: api/auth/signup
> - POST: api/auth/login
> - POST: api/auth/change-password
> - POST: api/auth/refresh-token

> ### User
>
> - GET: api/users
> - GET: api/users/:userId
> - PATCH: api/users/update-profile/:userId
> - DELETE: api/users/:userId

> ### Posts
>
> - GET: api/posts
> - POST: api/posts/create
> - PATCH: api/posts/update/:postId
> - DELETE: api/posts/:postId

> ### Vote
>
> - POST: api/vote/upvote
> - POST: api/vote/downvote

> ### Comment
>
> - POST: api/comment/create
> - PATCH: api/comment/update/:commentId
> - DELETE: api/comment/:commentId

> ### Follow
>
> - POST: api/follow/follow-user
> - POST: api/follow/unfollow-user

> ### Payment
>
> - GET: api/payment
> - POST: api/payment
> - PATCH: api/payment/confirm




## Local installation guideline

To run this project on your local machine. clone the repository and install dependency and env variables with your MongoDB database url. Then run the project. You will find env variable samples in .env.example file.

```
npm install
```

```
npm run start:dev
```

Then it will run on your localhost 5000 port.

> - Here is the Live link of front-end [Link](https://root-n-rise.vercel.app)


## Live link of the Server: https://root-n-rise-backend.vercel.app
