import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "./ui/label";
import { useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { Heading, SquareArrowOutUpRight } from "lucide-react";
import * as Yup from "yup";
import { QRCodeCanvas } from "qrcode.react";
import { customAlphabet } from "nanoid";
import { useURL } from "@/context/urlContext";
import { useAuth } from "@/context/authContext";

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  8
);

const CreateLink = ({ mainURL, domain }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { urlDataLoading, urlDataError, createNewURL } = useURL();
  const { user } = useAuth();

  const navigate = useNavigate();

  const [urlTitle, setUrlTitle] = useState("");
  const [longURL, setLongURL] = useState(
    () => searchParams.get("create-new-link") || ""
  );
  const [customURL, setCustomURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState([]);
  const qrCodeRef = useRef(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setError([]);
    try {
      const schema = Yup.object().shape({
        urlTitle: Yup.string().required("Title is required"),
        longURL: Yup.string()
          .url("Must be a valid URL")
          .required("Original URL is required"),
        customURL: Yup.string().max(100, "Max 100 Characters are allowed"),
      });

      await schema.validate(
        { urlTitle, longURL, customURL },
        { abortEarly: false }
      );

      const canvas = qrCodeRef.current;
      
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext("2d");
      // Fill white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      ctx.drawImage(canvas, 0, 0);
      
      
      const blob = await new Promise((resolve) => tempCanvas.toBlob(resolve));

      const res = await createNewURL({
        title: urlTitle.trim(),
        user_id: user.id,
        original_url: longURL.trim(),
        short_url: shortURL,
        custom_url: customURL.trim(),
        qr_code: blob,
      });

      if (res.success) {
        navigate(`/dashboard/${res.data[0].id}`);
      }
    } catch (er) {
      console.log("err", er);
      const newErrors = {};

      er?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longURL}
      onOpenChange={(res) => {
        !res ? setSearchParams({}) : null;
        setError([]);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"} className={"cursor-pointer"}>
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Short Link</DialogTitle>
        </DialogHeader>
        {urlDataError && (
          <p className="text-sm text-red-500">This Custom URL already exists</p>
        )}
        {longURL && !error.longURL && (
          <QRCodeCanvas
            bgColor="#FFFFFF"
            fgColor="#000000"
            value={`${mainURL}${customURL.length !== 0 ? customURL : shortURL}`}
            ref={qrCodeRef}
            size={128}
          />
        )}
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="title">URL Title</Label>
            <InputGroup>
              <InputGroupInput
                id="title"
                name="title"
                type={"text"}
                value={urlTitle}
                onChange={(e) => {
                  setUrlTitle(e.target.value);
                  if (customURL.length === 0 || customURL === null)
                    setShortURL(nanoid());
                }}
                autoComplete="url"
                placeholder={"Enter the URL Title"}
              />
              <InputGroupAddon>
                <InputGroupText>
                  <Heading strokeWidth={1} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.urlTitle && (
              <p className="text-sm text-red-500">{error.urlTitle}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="longURL">Long URL</Label>
            <InputGroup>
              <InputGroupInput
                id="longURL"
                name="longURL"
                type={"text"}
                value={longURL}
                onChange={(e) => {
                  setLongURL(e.target.value);
                }}
                autoComplete="url"
                placeholder={"Enter the Long URL"}
              />
              <InputGroupAddon>
                <InputGroupText>
                  <SquareArrowOutUpRight strokeWidth={1} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.longURL && (
              <p className="text-sm text-red-500">{error.longURL}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="customURL">Custom URL (optional)</Label>
            <InputGroup
              className={`${urlDataError ? "border border-red-500" : ""}`}
            >
              <InputGroupInput
                id="customURL"
                name="customURL"
                type={"text"}
                value={customURL}
                onChange={(e) => setCustomURL(e.target.value)}
                autoComplete="url"
                placeholder={"Enter the Long URL"}
              />
              <InputGroupAddon>
                <InputGroupText
                  className={"border-r dark:text-white text-black p-3"}
                >
                  <p className="">{domain}/</p>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.customURL && (
              <p className="text-sm text-red-500">{error.customURL}</p>
            )}
          </div>
          <Button variant={"outline"} type="submit" disabled={urlDataLoading}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
