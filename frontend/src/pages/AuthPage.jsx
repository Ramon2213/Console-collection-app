import '../App.css';
export default function AuthPage({ username, setUsername, password, setPassword, handleLogin, handleRegister }) {
    return (
        <div className="auth-container-wrapper">
            <div className="auth-container">
                <h2>Login / Register</h2>
                <form
                    className="auth-form"
                    onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                >
                    <input className="input-username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="button-group">

                        <button type="submit">Login</button>
                        <button className="login" type="button" onClick={handleRegister}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
