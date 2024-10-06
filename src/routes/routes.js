import config from '../config';

import Home from '../pages/Home';
import Discount from '../pages/Discount';
import Product from '../pages/Product';
import Order from '../pages/Order';

const publicRoutes = [
  {
    path: config.routes.dashboard,
    component: Home,
  },
  {
    path: config.routes.product,
    component: Product,
  },
  {
    path: config.routes.order,
    component: Order,
  },
  {
    path: config.routes.discount,
    component: Discount,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
