import PostRepository from '~/repositories/PostRepository'

export default ($axios) => ({
  post: PostRepository($axios),
})

