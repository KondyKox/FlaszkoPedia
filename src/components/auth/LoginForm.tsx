import AuthFormProps from "@/types/AuthProps";
import LoadingText from "../loading/LoadingText";
import InputPassword from "../ui/InputPassword";

const LoginForm = ({ setFormData, loading }: AuthFormProps) => {
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <InputPassword
        inputId="password"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        label="Hasło"
        placeholder="Wpisz swoje hasło..."
      />

      <button className="btn btn-primary w-full">
        {loading ? <LoadingText /> : "Zaloguj się"}
      </button>
    </div>
  );
};

export default LoginForm;
