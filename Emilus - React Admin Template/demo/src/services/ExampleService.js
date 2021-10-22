import fetch from 'auth/FetchInterceptor'

const exampleService = {}

exampleService.getPost = function (params) {
  return fetch({
    url: 'http://localhost:8080/api/test/get_all_sites',
    method: 'get',
    params
  })
}

exampleService.setPost = function (data) {
  return fetch({
    url: '/posts',
    method: 'post',
    data: data
  })
}

export default exampleService