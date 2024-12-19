import fetch from "auth/FetchInterceptor";

const exampleService = {};

exampleService.getUsers = function (params) {
  return fetch({
    url: "/users",
    method: "get",
    params,
  });
};

exampleService.setPost = function (data) {
  return fetch({
    url: "/posts",
    method: "post",
    data: data,
  });
};

export default exampleService;
