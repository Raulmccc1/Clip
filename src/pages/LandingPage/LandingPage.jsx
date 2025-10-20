import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { miniFeatures, stats, testimonials } from "./constants";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "@/context/authContext";

const InputURL = () => {
  const [url, setURL] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const { session, user, } = useAuth();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const schema = Yup.object().shape({
        url: Yup.string()
          .required("Enter a valid URL")
          .url("Must be a valid URL (including http/https)"),
      });

      await schema.validate({ url }, { abortEarly: false });
      url && (session || user)
        ? navigate(`/dashboard?create-new-link=${url}`)
        : navigate(`/auth?create-new-link=${url}`);
      setURL("");
    } catch (er) {
      const newErrors = {};
      
      er?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
    }
  };

  return (
    <form
      className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-[50%] mx-auto mt-10 sm:mt-14 md:mt-16 min-h-[5rem] p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-stretch gap-3 sm:gap-5 shadow-xl"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <Input
        placeholder="https://www.example.com/long/path"
        className={`flex-1 min-w-0 ${
          error.url ? "border-2 border-red-500" : ""
        }`}
        value={url}
        onChange={(e) => setURL(e.target.value)}
      />
      <Button className="w-full sm:w-auto whitespace-nowrap">
        Shorten URL
      </Button>
    </form>
  );
};

const LandingPage = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen p-0.5 sm:px-4 md:px-6 lg:px-8">
      <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28 border-b">
        <div className="flex flex-col items-center justify-center px-3 sm:px-0">
          <SquareArrowOutUpRight size={"64"} strokeWidth={"1"} />
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-center mt-3 font-extralight font-sans">
            Shorten your first link
          </h1>
          <p className="mt-3 text-center text-sm sm:text-base md:text-lg text-black/30 dark:text-white/50 max-w-3xl">
            Shorten your first link — Transform long, complex URLs into short,
            shareable links that look great on social, email, and SMS.
          </p>
        </div>

        <InputURL />

        <ul className="flex flex-col sm:flex-row items-start sm:justify-evenly gap-3 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-11 mb-8 sm:mb-10 md:mb-11 px-3 sm:px-0">
          {miniFeatures.map((val) => (
            <li key={val.name} className="list-none flex items-center gap-3">
              <div className={`${val.color} w-2 h-2 rounded-full`}></div>
              <p className="text-xs sm:text-sm text-black/50 dark:text-white/50">
                {val.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <div className="mb-12 sm:mb-16 md:mb-20 px-3 sm:px-0">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-light font-sans">
            What Our Users Say
          </h2>
          <p className="mt-3 text-center text-base sm:text-lg text-black/30 dark:text-white/50">
            Join thousands of satisfied users who trust ShortLink for their URL
            shortening needs.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mask-fade-x styled-scrollbar flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory p-4 md:p-5 lg:p-6 rounded-xl border-b shadow-sm">
            {testimonials.map((obj, idx) => (
              <div key={idx} className="snap-start shrink-0">
                <TestimonialCard {...obj} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-32 max-w-[50vw] md:max-w-7xl mx-auto shadow-xs rounded-2xl flex flex-wrap items-center justify-center md:justify-around gap-6 md:gap-8 p-4 sm:p-5 border text-center">
          {stats.map((val) => (
            <div
              key={val.count}
              className="w-1/2 sm:w-1/2 md:w-auto flex flex-col items-center"
            >
              <h3 className="text-2xl sm:text-3xl">{val.count}</h3>
              <p className="text-sm sm:text-base md:text-xl text-black/30 dark:text-white/50">
                {val.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
