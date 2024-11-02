import * as httpRequest from '../utils/httpRequest';

export const getAllOrders = async () => {
  try {
    const response = await httpRequest.get('/order/admin/get-all');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await httpRequest.put(
      `/order/admin/order-status/${orderId}`,
      { status }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
