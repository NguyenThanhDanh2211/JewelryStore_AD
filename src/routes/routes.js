import config from '../config';

import Home from '../pages/Home';
import Discount from '../pages/Discount';
import Product from '../pages/Product';
import Order from '../pages/Order';
import AddProduct from '../pages/AddProduct';
import UpdateProduct from '../pages/UpdateProduct';

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
    path: config.routes.addProduct,
    component: AddProduct,
  },
  {
    path: config.routes.updateProduct,
    component: UpdateProduct,
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
