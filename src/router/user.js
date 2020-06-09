const userRouters = [
  {
    path: "/user",
    name: "Home",
    component: () => import("./views/login/login"),
  },
];
export default userRouters;
