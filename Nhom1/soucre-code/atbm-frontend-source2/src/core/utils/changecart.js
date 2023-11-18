import { getProductByIdService } from '~/service/productService';
import { changeCart } from '~/store/action/cartAction';
import { useDispatch, useSelector } from 'react-redux';

// const HandleAddcart = async (product, amount) => {
//     const cart = useSelector(state => state.cart.cart);
//     try {
//         console.log(cart)
//         const res = await getProductByIdService(product)
//         const data = res && res.data ? res.data : ''
//         const datafill = {
//             img1: data.img1,
//             name: data.name,
//             percent: data.percent,
//             price: data.price,
//             saleCodeId: data.saleCodeId,
//             count: amount,
//             productId: data.id,

//         }
//         let check = false
//         const newCart = cart.length > 0 && cart.map(obj => {
//             if (obj.productId === product) {
//                 check = true
//                 return {
//                     ...obj,
//                     count: obj.count + amount
//                 };
//             }

//             return obj;
//         });
//         if (check) {
//             return newCart
//         }
//         return datafill
//     } catch (error) {
//         console.log(error)
//     }
// }
// export {
//     HandleAddcart
// }