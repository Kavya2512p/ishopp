import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Main';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../reducers/User';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const { data: cartData } = useSelector(store => store.cart);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatcher =useDispatch();
    const navigator= useNavigate();
    const {notify} = useContext(Context);

    // console.log("cartData", cartData);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            // Simulate successful login and reset form values
            // console.log('Email:', email);
            // console.log('Password:', password);

            // Reset state after successful validation
// axios.post

            axios.post(
                "http://localhost:5000/user/login",
                {
                    email, password
                }
            ).then( 
                (success) =>{
                    notify(success.data.msg, success.data.status);
                    if(success.data.status == 1){
                        dispatcher(
                            login({ 
                                user: success.data.user, 
                                token: success.data.token 
                            })
                        );
                        navigator("/");
                        //move to cart

                        axios.post("http://localhost:5000/user/move-to-cart",
                            {
                                cartData,
                                userId: success.data.user._id
                            }
                        ).then(
                            () =>{

                            }
                        ).catch(
                            () =>{

                            }
                        )
                    }
                    else{
                        setError(success.data.msg);
                    }
                }
            ).catch(
                (error) =>{
                    setError("Client side error");
                }
            )
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            console.log(err.message);
            // Handle errors here, e.g., if login fails due to server error
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
