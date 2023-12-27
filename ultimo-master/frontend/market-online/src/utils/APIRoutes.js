export const host="http://localhost:3000"
export const registerRoute=`${host}/api/auth/register`;
export const loginRoute=`${host}/api/auth/login`;
export const addToCartRoute = (userId, productId, quantity) =>`${host}/api/products/addToCart/${userId}/${productId}/${quantity}`;
export const getAllProducts = `${host}/api/products/getAllProducts`;
export const addToFavorites =(userId, productId)=> `${host}/api/products/addToFavorite/${userId}/${productId}`;
export const getFromCart =(userId)=> `${host}/api/products/getFromCart/${userId}`;
export const getFavoriteProducts =(userId)=> `${host}/api/products/getFavoriteProducts/${userId}`;
export const removeAllFromCart =(userId)=> `${host}/api/products/removeAllFromCart/${userId}`;
export const removeFavoriteProduct =(userId,productId)=> `${host}/api/products/removeFavoriteProduct/${userId}/${productId}`;
export const removeFromCart =(userId,productId)=> `${host}/api/products/removePruductCart/${userId}/${productId}`;
export const getAllAste=`${host}/api/aste/getAllAste`;
export const aggiornaPrezzo =(astaId,currentPrice)=> `${host}/api/aste/aggiornaPrezzo/${astaId}/${currentPrice}`;

