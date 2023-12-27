const {getProduct, getFavoriteProducts, addToFavorites, removeFavoriteProduct, addToCart,removeFromCart,getFromCart,removeAllFromCart} = require('../controllers/productController')

const router=require('express').Router();

router.get('/getAllProducts', getProduct)
router.get('/getFavoriteProducts/:userId', getFavoriteProducts)
router.post('/addToFavorite/:userId/:productId', addToFavorites)
router.post('/addToCart/:userId/:productId/:quantity', addToCart)
router.delete('/removeFavoriteProduct/:userId/:productId', removeFavoriteProduct)
router.delete('/removePruductCart/:userId/:productId', removeFromCart);
router.delete('/removeAllFromCart/:userId', removeAllFromCart);
router.get('/getFromCart/:userId', getFromCart)

module.exports = router;