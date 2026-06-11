import { useState } from "react";

function RegisterForm({ onRegister, onGoToLogin }) {
    // Estados do formulário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    // Criar conta
    async function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("Preencha nome, email e senha.");
            return;
        }
        if (password.length < 6) {
            alert("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não conferem.");
            return;
        }

        setIsLoading(true);

        await onRegister(
            name.trim(),
            email.trim().toLowerCase(),
            password
        );

        setIsLoading(false);
    }

    return (
        <div className="login-wrapper">
            <form className="login-container" onSubmit={handleSubmit}>
                <h2>Criar conta</h2>

                <input
                    value={name}
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                />

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
                <input
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirmar senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Criando..." : "Criar conta"}
                </button>

                <p className="auth-switch">
                    Já tem conta?{" "}
                    <button
                        type="button"
                        className="link-btn"
                        onClick={onGoToLogin}
                    >
                        Fazer login
                    </button>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;