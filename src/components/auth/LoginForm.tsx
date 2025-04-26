import AuthFormProps from "@/types/AuthFormProps";
import LoadingText from "../Loading/LoadingText";

const LoginForm = ({
  setEmail,
  setPassword,
  showPassword,
  renderEyeIcon,
  loading,
}: AuthFormProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full lg:w-1/2">
      <div className="relative border-2 rounded-xl w-full">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Wpisz swój email..."
          required
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative border-2 rounded-xl w-full">
        <label htmlFor="password" className="label">
          Hasło
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Podaj mi hasło..."
          required
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        {renderEyeIcon()}
      </div>

      <button className="btn btn-primary w-full">
        {loading ? <LoadingText /> : "Zaloguj się"}
      </button>
    </div>
  );
};

export default LoginForm;
