import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorChart } from "@/components/VisitorChart";
import { VisitorPieChart } from "@/components/VisitorsPieCharts";
import { mainURL } from "@/constants/domainConstants";
import { useAuth } from "@/context/authContext";
import { useURL } from "@/context/urlContext";
import useRequireAuth from "@/hooks/useRequireAuth";
import { ArrowLeft, Copy, Download, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const LinkAnalytic = () => {
  useRequireAuth();

  const { id } = useParams();
  const { user, authLoading } = useAuth();
  const { getURL, getClicksForURL, urlDataLoading, deleteURL } = useURL();
  const [urlData, setUrlData] = useState(null);
  const [clicksData, setClicksData] = useState(null);
  const naviagte = useNavigate();

  const short_url = `${mainURL}${
    urlData?.custom_url !== null ? urlData?.custom_url : urlData?.short_url
  }`;

  useEffect(() => {
    if (authLoading) return;
    (async () => {
      try {
        const res = await getURL(id, user?.id);
        if (res.success) {
          setUrlData(res.data);
        }
      } catch (error) {
        console.error("Err url: ", error);
      }
    })();
  }, [authLoading]);

  useEffect(() => {
    if (urlData === null) return;
    (async () => {
      try {
        const res = await getClicksForURL(urlData?.id);
        if (res.success) {
          setClicksData(res.data);
        }
      } catch (error) {
        console.error("Err click: ", error);
      }
    })();
  }, [urlData]);

  const aggregateClicksByDateAndDevice = useMemo(() => {
    if (clicksData === null) return [];
    const map = {};

    for (const click of clicksData) {
      const date = click.created_at.slice(0, 10);

      if (!map[date]) {
        map[date] = {
          date,
          desktop: 0,
          mobile: 0,
          tablet: 0,
        };
      }

      const entry = map[date];

      const device = click.device.toLowerCase();
      if (device === "desktop") {
        entry.desktop += 1;
      } else if (device === "mobile") {
        entry.mobile += 1;
      } else if (device === "tablet") {
        entry.tablet += 1;
      } else {
        entry.device = (entry.other || 0) + 1;
      }
    }

    const result = Object.values(map).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    return result;
  }, [clicksData]);

  const pieData = useMemo(() => {
    if (clicksData === null) return [];
    const deviceCount = clicksData.reduce((acc, curr) => {
      const device = curr.device.toLowerCase();
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(deviceCount).map(([device, visitors]) => ({
      device,
      visitors,
      fill: `var(--color-${device})`,
    }));

    return chartData;
  }, [clicksData]);

  const onDelete = async (id, qr) => {
    const fileName = qr.split("/").pop();
    const res = await deleteURL(id, fileName);
    if (res.success) {
      naviagte("/dashboard");
    }
  };

  const onDownload = async () => {
    try {
      const response = await fetch(urlData.qr_code);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = urlData.title || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen antialiased p-0.5 sm:px-4 md:px-6 lg:px-8 print:px-4 print:py-6">
      {urlDataLoading && (
        <BarLoader
          width={"100%"}
          height={55}
          color="red"
          cssOverride={{
            position: "fixed",
            left: "0px",
            top: "0px",
          }}
        />
      )}
      <div className="py-5 mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28 md:py-8">
        <Button variant={"outline"} className={"mb-6 rounded-lg px-4 py-2 "}>
          <Link
            to={"/dashboard"}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft strokeWidth={1} />
            Back to Dashboard
          </Link>
        </Button>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-xl border space-y-3">
            <p className="text-lg sm:text-xl md:text-2xl">{urlData?.title}</p>

            <a target="_blank" href={urlData?.original_url} className="block">
              <p className="truncate text-sm sm:text-base text-blue-700 dark:text-blue-400 break-all md:break-words bg-blue-50/60 dark:bg-blue-950/20 rounded-md px-3 py-2">
                {urlData?.original_url}
              </p>
            </a>

            <a target="_blank" href={short_url} className="block">
              <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100 break-all md:break-words bg-gray-50 dark:bg-zinc-800 rounded-md px-3 py-2">
                {short_url}
              </p>
            </a>
            <Card>
              <CardContent className={"flex flex-col gap-5"}>
                <div className="flex items-start justify-start gap-2 sm:gap-3">
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
                      onClick: () => onDelete(urlData?.id, urlData?.qr_code),
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
                <img
                  src={urlData?.qr_code}
                  alt={urlData?.title}
                  className="w-32 h-32"
                />
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <Card className={"w-full"}>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <VisitorChart chartData={aggregateClicksByDateAndDevice} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-3">
          <Card>
            <CardContent>
              <VisitorPieChart chartData={pieData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkAnalytic;
