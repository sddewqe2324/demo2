// components/Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [username, setUsername] = useState('');
    const router = useRouter();
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Perform login API request
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            })

            if (response.ok) {
                const responseData = await response.json();

                // Store the token in local storage
                localStorage.setItem("token", responseData.token);
                router.push("/Producttable")
            } else {
            }
        } catch (error) {
        }
    };

    return (
        <div className="container mt-5 pt-5 mb-5">
            <div className='mx-3 p-5' style={{
                background: "cadetblue"
            }}>
                <div style={{
                    display: 'flex', justifyContent: "center"
                }}>
                    <img
                        alt="menu"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAABwCAMAAAC0NjyXAAADAFBMVEUAAAD//////////////////////////////////////K//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6AD////////////////////////////////////////////////////////////////////////////+4Qb/////////////////5QL/////////////////5gD/5wD/////////////////////////////////////5gD/////////////5gD/////////////5QD/////5AH/5wD/////////6QD/////5QD/6wD/5QD/5gD/5gD/5gD/6gD/////6AD/5AL/3gD/5wD/5QD/5gD/5gD/////5gD/////5gH/4QT/////5gD1sCv/5wD/5QD/4wP/////5wH/6AD/5gD/5gD/5QD/5QD/////6gD/5gD/5AD/6AD2rDD/5QD/5QD/6AD/5gH/7AD/5wD/6wD/4wD/7AD/6wD+4AT/6gD/5wD/5gD1tSb81g7/5QD/6AD0qjD0qTD/8wD/5gD2syr0tCb/6QD/6QD0qy/91g7/7wH/5gD/6wD/9gDzrC3/8QD2tCj/7gD2siv5wh33uSTzqy35xxj1riz/8AD7zxH5wxz/9AHzqjH95Ab93Q32uCX/9QD/9AD1syn1sir6yRj4yhn4uSX5xRz/+QD71Q32uyH/9wD/////5QD/7QD/6gD/7wD/6QH/6AD/5wD/8gDzqjD/7AD/+gD/9AD/9wD/8QD/0Rf5vSL+3Qj//QD9sTL+vSj7zxL+2A77rjP8tS75yBj/4gTypzH/yR74whylRiG6AAAA4nRSTlMA/fgcDO90Beb0ASoOIOvhOQLwpSwJ9sIYEPKJ2LCeNiQTMIzKxVIe7XLo49GsqI76yLZsKBLau6KbmEcaFvz73GRUJg/TlTQKB86A3oNp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"
                        className='pt-4 pb-5 img-fluid m-0'
                        style={{
                            width: "50%"
                        }}
                    />
                </div>
                <h1 style={{ color: "#fff" }}><b>Login</b></h1>
                <form className='pt-2'>
                    <div className="form-group">
                        <label htmlFor="username" style={{ color: "#fff" }}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{ color: "#fff" }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary w-100 py-3" onClick={handleLogin}>
                        <b>Login</b>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
