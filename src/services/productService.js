import * as httpRequest from '../utils/httpRequest';

export const getProductBySlug = async (slug) => {
  try {
    const response = await httpRequest.get(`product/${slug}`);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const response = await httpRequest.get('product/get-all-products');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFilteredProducts = async ({
  page = 1,
  limit = 3,
  category,
  tag,
  minPrice,
  maxPrice,
}) => {
  try {
    const query = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(tag && { tag }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    }).toString();

    const response = await httpRequest.get(
      `product/get-filtered-products?${query}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const search = async (q, type = 'less') => {
  try {
    const response = await httpRequest.get('product/search', {
      params: { q, type },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await httpRequest.post(
      'product/add-product',
      productData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateProduct = async (slug, productData) => {
  try {
    const response = await httpRequest.put(
      `product/products/${slug}`,
      productData
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
