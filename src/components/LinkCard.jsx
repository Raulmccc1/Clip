import { Button } from "./ui/Button";
import { Copy, Download, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

const LinkCard = ({ url, mainURL, onDelete }) => {
  const createdAt = url?.created_at ? new Date(url.created_at) : null;
  const createdAtISO = createdAt ? createdAt.toISOString() : "";
  const shortHref = `${mainURL}${
    url?.custom_url ? url?.custom_url : url?.short_url
  }`;
  const originalHref = url?.original_url || "";
  const qrAlt = url?.title ? `QR code for ${url.title}` : "QR code";
  const title = url?.title || "Untitled";

  const onDownload = async () => {
    try {
      const response = await fetch(url.qr_code);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = url.title || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={"max-w-full"}>
      <CardContent>
        <article
          className="w-full rounded-2xl p-5 md:p-6"
          aria-labelledby={`url-title-${url?.id || url?.short_url || "item"}`}
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="h-44 w-44 rounded-lg p-3 bg-white">
              <img
                src={url.qr_code}
                alt={qrAlt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-4 sm:flex-1">
              <header>
                <h3
                  id={`url-title-${url?.id || url?.short_url || "item"}`}
                  className="text-lg font-semibold tracking-tight"
                >
                  {title}
                </h3>
              </header>

              {originalHref && (
                <a
                  href={originalHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow ugc"
                  className="text-sm text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  <p className="sm:max-w-40 md:max-w-5xl truncate">
                    {originalHref}
                  </p>
                </a>
              )}

              {url?.short_url && (
                <a
                  href={shortHref}
                  target="_blank"
                  rel="noopener noreferrer nofollow ugc"
                  className="block max-w-fit truncate text-sm hover:text-blue-500"
                >
                  {shortHref}
                </a>
              )}

              {createdAt && (
                <p className="text-sm">
                  Created{" "}
                  <time dateTime={createdAtISO} suppressHydrationWarning>
                    {createdAt.toLocaleString()}
                  </time>
                </p>
              )}
            </div>

            <div className="flex flex-row items-center sm:flex-col sm:items-end justify-between gap-4 sm:gap-6">
              <div className="flex items-start justify-center gap-2 sm:gap-3">
                {[
                  {
                    variant: "outline",
                    type: "button",
                    onClick: () => navigator.clipboard.writeText(shortHref),
                    className:
                      "inline-flex h-9 w-9 items-center justify-center rounded-md border",
                    ariaLabel: "Copy short URL",
                    title: "Copy short URL",
                    icon: {
                      type: Copy,
                      ariaHidden: "true",
                      focusable: "false",
                      className: "h-4 w-4",
                    },
                  },
                  {
                    variant: "outline",
                    type: "button",
                    onClick: () => onDelete(url?.id, url?.qr_code),
                    className:
                      "inline-flex h-9 w-9 items-center justify-center rounded-md border text-red-600",
                    ariaLabel: "Delete link",
                    title: "Delete link",
                    icon: {
                      type: Trash,
                      ariaHidden: "true",
                      focusable: "false",
                      className: "h-4 w-4",
                    },
                  },
                  {
                    variant: "outline",
                    type: "button",
                    onClick: onDownload,
                    className:
                      "inline-flex h-9 w-9 items-center justify-center rounded-md border",
                    ariaLabel: "Download QR code",
                    title: "Download QR code",
                    icon: {
                      type: Download,
                      ariaHidden: "true",
                      focusable: "false",
                      className: "h-4 w-4",
                    },
                  },
                ].map((obj, idx) => (
                  <Button
                    key={idx}
                    variant={obj.variant}
                    type={obj.type}
                    onClick={obj.onClick}
                    className={obj.className}
                    aria-label={obj.ariaLabel}
                    title={obj.title}
                  >
                    <obj.icon.type
                      aria-hidden={obj.icon.ariaHidden}
                      focusable={obj.icon.focusable}
                      className={obj.icon.className}
                    />
                  </Button>
                ))}
              </div>

              <Link
                to={`/dashboard/${url?.id || ""}`}
                className="inline-flex items-center justify-center rounded-md px-3 py-2"
                aria-label="Open analytics"
              >
                <Button
                  variant={"outline"}
                  className={"inline-flex items-center justify-center"}
                >
                  Analytics
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
