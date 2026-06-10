import { useState } from "react";

function LoginForm({ onLogin }) {
    // Estados do formulário de login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Login
    async function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("Preencha email e senha.");
            return;
        }

        setIsLoading(true);

        await onLogin(email.trim().toLowerCase(), password);

        setIsLoading(false);
    }

    return (
        <div className="login-wrapper">
            <form className="login-container" onSubmit={handleSubmit}>
                <h2>Acesse sua conta</h2>

                <input
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    value={password}
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;