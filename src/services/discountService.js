import * as httpRequest from '../utils/httpRequest';

export const getAllDiscount = async () => {
  try {
    const response = await httpRequest.get('discount/get-all-discount');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const create = async (data) => {
  try {
    const response = await httpRequest.post('discount/create', data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await httpRequest.del(`discount/del/${id}`);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
