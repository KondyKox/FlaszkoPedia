import Image from "next/image";
import InputGroup from "../auth/InputGroup";
import { VODKA_FLAVOR_OPTIONS } from "@/constants/filterOptions";
import Store from "../vodka/Store";
import FeedbackMessage from "../ui/FeedbackMessage";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";
import { useState } from "react";
import { addVodka, updateVodka } from "@/lib/utils/admin/vodkas";
import { VodkaFormProps } from "@/types/ModalProps";

// Vodka methods
const submitVodka = {
  add: addVodka,
  edit: updateVodka,
};

const VodkaForm = ({
  formData,
  setFormData,
  refreshVodkas,
  action,
  onClose,
}: VodkaFormProps) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const selectedVariant = formData.variants[selectedVariantIndex];
  const [successful, setSuccessful] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const { animate, triggerAnimation } = useAnimateFeedback();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!submitVodka[action]) return;

      const formattedFormData = {
        ...formData,
        variants: formData.variants.map((variant) => ({
          ...variant,
          stores: variant.stores.map((store) => ({
            ...store,
            price: store.price,
          })),
        })),
      };

      const { message, success } = await submitVodka[action](formattedFormData);
      if (message) setFeedback(message);
      setSuccessful(success);
    } catch (error) {
      const verb = action === "add" ? "dodać" : "zaktualizować";
      setSuccessful(false);
      setFeedback(`Nie udało się ${verb} wódki.`);
      console.error(
        `Failed to ${action === "add" ? "add" : "update"} vodka:`,
        error
      );
    }

    triggerAnimation();
    setTimeout(() => {
      onClose();
      refreshVodkas();
    }, 2000);
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center items-center gap-6 w-full"
      >
        <div className="flex justify-between items-stretch gap-8 w-full border-b-2 border-golden pb-4">
          <Image
            src={formData.imageSrc || "/vodkas/placeholder.png"}
            alt={formData.name || "Brak nazwy"}
            width={64}
            height={64}
            unoptimized
            className="min-w-16 hidden md:block"
          />
          <div className="flex flex-col flex-1 gap-4">
            {/* Vodka name */}
            <InputGroup
              label="Nazwa wódki"
              id="vodkaName"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nazwa dla wódki..."
              required={action === "add"}
            />
            {/* Vodka image src */}
            <InputGroup
              label="URL zdjęcia"
              id="vodkaImg"
              value={formData.imageSrc}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  imageSrc: e.target.value,
                }))
              }
              placeholder="https://link-do-zdjecia.pl"
              required={action === "add"}
            />
            {/* Alcohol % */}
            <InputGroup
              label="Zawartość alkoholu (%)"
              id="alcoholPercentage"
              type="number"
              value={formData.alcoholPercentage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  alcoholPercentage: Number(e.target.value),
                }))
              }
              placeholder="Jaki procent alkoholu..."
              required={action === "add"}
            />
            {/* Vodka flavor */}
            <div className="input-container">
              <label htmlFor="vodkaFlavor" className="label">
                Smak wódki
              </label>
              <select
                id="vodkaFlavor"
                name="vodkaFlavor"
                className="input"
                value={formData.flavor}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    flavor: e.target.value,
                  }))
                }
              >
                {VODKA_FLAVOR_OPTIONS.map((flavor) => {
                  if (flavor.value === "") return;
                  return (
                    <option key={flavor.value} value={flavor.value}>
                      {flavor.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Vodka variants */}
        <div className="input-container gap-6 flex flex-col bg-primary py-2">
          <label htmlFor="vodkaVariants" className="label">
            Ceny w sklepach
          </label>
          <div className="flex justify-center items-center w-full overflow-hidden border-b">
            {formData.variants.map((variant, index) => (
              <div
                key={index}
                className={`text-sm p-1 transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-primary w-full flex flex-1 justify-center items-center ${
                  variant === selectedVariant && "bg-header text-primary"
                } cursor-pointer`}
                onClick={() => setSelectedVariantIndex(index)}
              >
                {variant.volume}L
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center w-full overflow-hidden rounded-b-lg gap-2 px-2">
            {selectedVariant.stores.map((store) => {
              const variantIndex = formData.variants.findIndex(
                (v) => v.volume === selectedVariant.volume
              );
              return (
                <div
                  key={store.name}
                  className="flex-1 flex flex-col justify-center items-center gap-2"
                >
                  <Store
                    store={store}
                    isAdmin
                    setFormData={setFormData}
                    variantIndex={variantIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Vodka description */}
        {/* <InputGroup
          label="Opis wódki (opcjonalne)"
          id="vodkaDesc"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Jaka jest historia tej wódki..."
          isTextArea
        /> */}

        <button className="btn btn-primary w-full font-bold uppercase">
          {action === "add" ? "Dodaj wódkę" : "Aktualizuj"}
        </button>
      </form>
      <FeedbackMessage isSuccessful={successful} animate={animate}>
        {feedback}
      </FeedbackMessage>
    </>
  );
};

export default VodkaForm;
