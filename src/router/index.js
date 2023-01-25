import { UserRouter , MessageRouter } from "../components";

const routes = [
  ["user", UserRouter],
  ["message", MessageRouter] 
];

const router = (app) => {
  routes.forEach(([path, controller]) =>
    app.use(`/api/v1/${path}`, controller)
  );
};

export default router;