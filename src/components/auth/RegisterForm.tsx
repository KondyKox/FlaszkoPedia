import AuthFormProps from "@/types/AuthProps";
import LoadingText from "../loading/LoadingText";
import InputPassword from "../ui/InputPassword";

const RegisterForm = ({
  setEmail,
  setPassword,
  setRepPassword,
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
      <InputPassword
        inputId="password"
        onChange={(e) => setPassword(e.target.value)}
        label="Hasło"
        placeholder="Podaj hasło..."
      />
      <InputPassword
        inputId="repPassword"
        onChange={(e) => setRepPassword && setRepPassword(e.target.value)}
        label="Hasło"
        placeholder="Powtórz swoje hasło..."
      />
      <button className="btn btn-primary w-full">
        {loading ? <LoadingText /> : "Zarejestruj się"}
      </button>
    </div>
  );
};

export default RegisterForm;
