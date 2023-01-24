import { UserRouter } from "../components";

const routes = [["user", UserRouter]];

const router = (app) => {
  routes.forEach(([path, controller]) =>
    app.use(`/api/v1/${path}`, controller)
  );
};

export default router;