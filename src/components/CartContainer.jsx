import React, {useState, useEffect} from 'react';
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {RiRefreshFill} from 'react-icons/ri'
import {motion} from 'framer-motion'
import {useStateValue} from "../context/StateProvider";
import {actionType} from "../context/reducer";
import EmptyCart from '../img/emptyCart.svg'
import {CartItem} from "./index";

const CartContainer = () => {


    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
    }, [tot, flag]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });

        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    return (
        <motion.div
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 200}}
            className='fixed top-0 right-0 w-full md:w-375 h-[100vh] bg-white drop-shadow-md flex flex-col z-[101]'
        >
            <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
                <motion.div whileTap={{scale: 0.75}}
                            onClick={showCart}
                >
                    <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
                </motion.div>
                <p className='text-textColor text-lg font-semibold'>Корзина</p>
                <motion.p whileTap={{scale: 0.75}}
                          className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base'
                          onClick={clearCart}
                >
                    очистить <RiRefreshFill/>
                </motion.p>
            </div>

            {/*нижняя часть*/}
            {cartItems && cartItems.length > 0 ? (
                <div className='w-full h-full bg-cartBg rounded-t-[2em] flex flex-col'>

                    {/*раздел товаров в корзине*/}
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">

                        {/*корзина товаров*/}
                        {
                            cartItems && cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    setFlag={setFlag}
                                    flag={flag}
                                />
                            ))
                        }
                    </div>

                    {/*общий раздел корзины*/}
                    <div
                        className='w-full flex-1 bg-cartTotal rounded-t[2em] flex flex-col items-center justify-evenly px-8 py-2'>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>Сумма</p>
                            <p className='text-gray-400 text-lg'>$ {tot}</p>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>Доставка</p>
                            <p className='text-gray-400 text-lg'>$ 2.5</p>
                        </div>

                        <div className='w-full border-b border-gray-600 my-2'></div>

                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-200 text-lg font-semibold'>Итог</p>
                            <p className='text-gray-200 text-lg font-semibold'>$ {tot + 2.5}</p>
                        </div>

                        {user ? (
                            <motion.button whileTap={{scale: 0.8}}
                                           className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-lg my-2 hover:shadow-lg'
                            >
                                Проверить
                            </motion.button>
                        ) : (
                            <motion.button whileTap={{scale: 0.8}}
                                           className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-lg my-2 hover:shadow-lg'
                            >
                                Войдите, чтобы проверить
                            </motion.button>
                        )}
                    </div>
                </div>

            ) : (
                <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                    <img src={EmptyCart} className='w-300' alt="EmptyCart"/>
                    <p className='text-lg text-textColor font-semibold'>
                        Добавить несколько товаров в корзину
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default CartContainer;