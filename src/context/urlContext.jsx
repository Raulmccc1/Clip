import { createContext, useContext, useState } from "react";
import supabase, { supabaseUrl } from "../supabase/supabase";
import { UAParser } from "ua-parser-js";
import DeviceDetector from "device-detector-js";

const UrlContext = createContext();
const deviceDetector = new DeviceDetector();

const parser = new UAParser();
const result = parser.getResult();
const userDeviceInfo = deviceDetector.parse(result.ua);

export function URLProvider({ children }) {
  const [urlDataLoading, setURLDataLoading] = useState(true);
  const [urlDataError, setURLDataError] = useState("");

  // Gets all the url that belong to this user
  const getURLS = async (user_id) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const { data: URLData, error } = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);
      if (error) {
        setURLDataError(error.message);
        console.error("Error fetching all urls:", error.message);
        return { success: false, data: error };
      }
      return { success: true, data: URLData };
    } catch (err) {
      setURLDataError(err.message);

      console.error("Error fetching all urls:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  const getURL = async (url_id, user_id) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const { data: URLData, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", url_id)
        .eq("user_id", user_id)
        .single();
      if (error) {
        setURLDataError(error.message);
        console.error("Error fetching all urls:", error.message);
        return { success: false, data: error };
      }

      return { success: true, data: URLData };
    } catch (err) {
      setURLDataError(err.message);

      console.error("Error fetching all urls:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  // Gets all the clicks for all the urls
  const getClicksForURLS = async (urlsIdArr) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const { data: URLClickData, error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", urlsIdArr);
      if (error) {
        setURLDataError(error.message);
        console.error(
          "Error fetching all clicks data for all urls:",
          error.message
        );
        return { success: false, data: error };
      }

      return { success: true, data: URLClickData };
    } catch (err) {
      setURLDataError(err.message);

      console.error(
        "Error fetching all clicks data for all urls:",
        err.message
      );
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  const deleteURL = async (url_id, fileName) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const { data: URLClickData, error } = await supabase
        .from("urls")
        .delete()
        .eq("id", url_id);

      if (error) {
        setURLDataError(error.message);
        console.error("Error deleting the url:", error.message);
        return { success: false, data: error };
      }

      const { error: StorageError } = await supabase.storage
        .from("Qr_code")
        .remove([fileName]);

      if (StorageError) {
        setURLDataError(StorageError.message);
        console.error("Error deleting the qr code:", StorageError.message);
        return { success: false, data: StorageError };
      }

      return { success: true, data: URLClickData };
    } catch (err) {
      setURLDataError(err.message);

      console.error("Error deleting the url:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  const createNewURL = async ({
    title,
    user_id,
    original_url,
    short_url,
    custom_url,
    qr_code,
  }) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const customURL = custom_url.length === 0 ? null : custom_url;
      const fileName = `qr-${customURL || short_url}.png`;
      const qr = `${supabaseUrl}/storage/v1/object/public/Qr_code/${fileName}`;

      const { data, error } = await supabase
        .from("urls")
        .insert([
          {
            title,
            user_id,
            original_url,
            custom_url: customURL,
            short_url,
            qr_code: qr,
          },
        ])
        .select();

      if (error) {
        setURLDataError(error.message);
        console.error("Error creating new url:", error.message);
        return { success: false, data: error };
      }

      const { error: StorageError } = await supabase.storage
        .from("Qr_code")
        .upload(fileName, qr_code);
      if (StorageError) {
        setURLDataError(StorageError.message);
        console.error("Error uploading the qr code:", StorageError.message);
        return { success: false, data: StorageError };
      }

      return { success: true, data };
    } catch (err) {
      setURLDataError(err.message);

      console.error("Catch block Error creating new url:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  const getLongURL = async (url_id) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const { data: LongURLData, error } = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq.${url_id},custom_url.eq.${url_id}`)
        .single();
      if (error) {
        setURLDataError(error.message);
        console.error("Error getting the long url:", error.message);
        return { success: false, data: error };
      }

      return { success: true, data: LongURLData };
    } catch (error) {
      setURLDataError(err.message);

      console.error("Error getting the long url:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  const storeClicks = async (url_id, original_url) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const device = userDeviceInfo.device.type || "desktop";

      const res = await fetch("https://api.ipwho.org/me");
      const resJson = await res.json();
      const city = resJson.data.city;
      const country = resJson.data.country;

      const { error } = await supabase
        .from("clicks")
        .insert({ url_id, city, country, device });

      window.location.href = original_url;

      if (error) {
        setURLDataError(error.message);
        console.error("Error storing the click for this url:", error.message);
        return { success: false, data: error };
      }
    } catch (error) {
      setURLDataError(err.message);

      console.error("Error storing the click for this url:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  const getClicksForURL = async (url_id) => {
    setURLDataLoading(true);
    setURLDataError("");

    try {
      const { data: ClicksData, error } = await supabase
        .from("clicks")
        .select("*")
        .eq("url_id", url_id);

      if (error) {
        setURLDataError(error.message);
        console.error("Error getting the clicks for this url:", error.message);
        return { success: false, data: error };
      }

      return { success: true, data: ClicksData };
    } catch (error) {
      setURLDataError(err.message);

      console.error("Error getting the clicks for this url:", err.message);
      return { success: false, data: err };
    } finally {
      setURLDataLoading(false);
    }
  };

  return (
    <UrlContext.Provider
      value={{
        urlDataLoading,
        urlDataError,
        getURLS,
        getURL,
        getClicksForURLS,
        deleteURL,
        createNewURL,
        getLongURL,
        storeClicks,
        getClicksForURL,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}

export function useURL() {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useURL must be used within an URLProvider");
  }
  return context;
}
