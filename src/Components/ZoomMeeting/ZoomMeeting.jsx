import { useEffect, useRef, useState } from "react";
import "./ZoomMeeting.css";

const decodeJwtPayload = (token) => {
  try {
    const payload = token?.split?.(".")?.[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(normalized);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const ZoomMeeting = ({ meetingData, profile }) => {
  const zoomClientRef = useRef(null);
  const meetingRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const signature = meetingData?.sdk?.signature;
  const meetingNumber = meetingData?.sdk?.meeting_number;
  const sdkKey = meetingData?.sdk?.sdk_key;
  const password = meetingData?.password ?? "";
  const userName = profile?.name || "Coach";
  const userEmail = profile?.email || "";
  const zak = meetingData?.zak;

  useEffect(() => {
    setStatus("loading");
    setErrorMessage("");

    if (!signature || !meetingNumber || !sdkKey) {
      setStatus("error");
      setErrorMessage("Missing meeting credentials. Please rejoin the session.");
      return;
    }

    if (!window.ZoomMtgEmbedded) {
      setStatus("error");
      setErrorMessage("Zoom SDK failed to load. Refresh the page and try again.");
      return;
    }

    const cleanMeetingNumber = String(meetingNumber).replace(/\D/g, "");
    if (!cleanMeetingNumber) {
      setStatus("error");
      setErrorMessage("Invalid meeting number in video token.");
      return;
    }

    const jwtPayload = decodeJwtPayload(signature);
    if (jwtPayload?.exp && jwtPayload.exp * 1000 < Date.now()) {
      setStatus("error");
      setErrorMessage("Meeting signature expired. Go back and join the session again.");
      return;
    }

    const jwtMeetingNumber = String(jwtPayload?.mn || "").replace(/\D/g, "");
    if (jwtMeetingNumber && jwtMeetingNumber !== cleanMeetingNumber) {
      setStatus("error");
      setErrorMessage(
        "Meeting number does not match the signature. Please rejoin the session."
      );
      return;
    }

    const jwtSdkKey = jwtPayload?.sdkKey || jwtPayload?.appKey;
    if (jwtSdkKey && sdkKey && jwtSdkKey !== sdkKey) {
      console.warn("Zoom sdk_key does not match signature appKey/sdkKey", {
        sdkKey,
        jwtSdkKey,
      });
    }

    let cancelled = false;
    let joined = false;
    const client = window.ZoomMtgEmbedded.createClient();
    zoomClientRef.current = client;

    const clearStatusOverlay = () => {
      joined = true;
      setErrorMessage("");
      setStatus("joined");
    };

    try {
      client.on?.("connection-change", (payload) => {
        const state = payload?.state || payload?.status;
        if (
          !cancelled &&
          (state === "Connected" || state === "connected")
        ) {
          clearStatusOverlay();
        }
      });
    } catch {
      // older SDK builds may not expose this event
    }

    const startMeeting = async () => {
      try {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        if (cancelled || !meetingRef.current) return;

        const root = meetingRef.current;

        await client.init({
          zoomAppRoot: root,
          language: "en-US",
          patchJsMedia: true,
          leaveOnPageUnload: true,
          customize: {
            video: {
              isResizable: true,
            },
          },
        });

        if (cancelled) return;

        const joinParams = {
          signature,
          sdkKey,
          meetingNumber: cleanMeetingNumber,
          password: String(password || ""),
          userName: String(userName || "Coach"),
          userEmail: String(userEmail || ""),
        };

        if (zak) {
          joinParams.zak = zak;
        }

        console.log("Zoom join params (safe):", {
          meetingNumber: cleanMeetingNumber,
          hasPassword: Boolean(password),
          hasZak: Boolean(zak),
          role: jwtPayload?.role,
          sdkKeyPrefix: String(sdkKey).slice(0, 6),
          signatureExp: jwtPayload?.exp
            ? new Date(jwtPayload.exp * 1000).toISOString()
            : null,
        });

        await client.join(joinParams);
        if (!cancelled) {
          clearStatusOverlay();
        }
      } catch (error) {
        // Join can reject after the meeting UI is already live — don't keep the error overlay
        if (!cancelled && joined) {
          clearStatusOverlay();
          return;
        }
        if (!cancelled) {
          console.error("Zoom join error:", error);
          const code = error?.errorCode;
          let message =
            error?.reason ||
            error?.message ||
            "Failed to join the Zoom meeting.";

          if (code === 200) {
            message =
              "Zoom connection failed (error 200). Usually caused by an expired/invalid signature, wrong password, or a draft Zoom app joining a meeting outside your Zoom account. Rejoin from the schedule, and confirm the Meeting SDK app is published if the host is on another Zoom account.";
          }

          setStatus("error");
          setErrorMessage(message);
        }
      }
    };

    startMeeting();

    return () => {
      cancelled = true;
      const cleanup = async () => {
        try {
          if (joined && zoomClientRef.current) {
            await zoomClientRef.current.leaveMeeting?.();
          }
        } catch {
          // already left / not joined
        }
        try {
          window.ZoomMtgEmbedded?.destroyClient?.();
        } catch (e) {
          console.error("Zoom cleanup error:", e);
        }
        zoomClientRef.current = null;
      };
      cleanup();
    };
  }, [signature, meetingNumber, sdkKey, password, userName, userEmail, zak]);

  return (
    <div className="zoom-meeting-shell">
      {status === "loading" && (
        <div className="zoom-meeting-status">Connecting to meeting...</div>
      )}
      {status === "error" && (
        <div className="zoom-meeting-status zoom-meeting-status--error">
          {errorMessage}
        </div>
      )}
      <div ref={meetingRef} id="zoom-meeting" />
    </div>
  );
};

export default ZoomMeeting;
