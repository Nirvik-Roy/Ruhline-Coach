import React, { useEffect, useState } from "react";
import "./AppoinmentProgram.css";
import img from "../../../../assets/Group 1597882967 (1).png";
import user from "../../../../assets/User Info.png";
import icon1 from "../../../../assets/Group (2).svg";
import icon2 from "../../../../assets/Layer_1 (5).svg";
import icon3 from "../../../../assets/Group (3).svg";
import icon4 from "../../../../assets/Frame (1).svg";
import icon5 from "../../../../assets/Icon (3).svg";
import icon6 from "../../../../assets/Layer_1 (6).svg";
import icon7 from "../../../../assets/Group 1597882969 (1).svg";
import tick from "../../../../assets/Layer_1 (7).svg";
import lock from "../../../../assets/lock.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModuleUnlockModal from "../../../Modal/ModuleUnlockModal";
import {
  fetchProgramSessionDetails,
  fetchProgramSessionModule,
  fetchVideoToken,
  joinMeeting,
  lockUnlockModules,
} from "../../../../utils/Program";
import DashboardLoader from "../../../../Components/Loaders/DashboardLoader.jsx";
import ModalLoader from "../../../../Components/Loaders/ModalLoader.jsx";
import FindYourMotivationModule from "../../../Programs/SingleCreatedPrograms/ProgramModule/FindYourMotivationModule/FindYourMotivationModule.jsx";
import FindYourmotivation from "../../../Modal/FindYourmotivation.jsx";
import ZoomMeeting from "../../../../Components/ZoomMeeting/ZoomMeeting.jsx";
import { getCoachProfile } from "../../../../Services/GetCoachProfile.js";
const AppoinmentPrograms = () => {
  const [modal, setModal] = useState(false);
  const [title, setTile] = useState("");
  const [index, setIndex] = useState();
  const [motivationModel, setmotivationModel] = useState(false);
  const [sessionLoader, setsessionLoader] = useState(false);
  const [moduleLoader, setmoduleLoader] = useState(false);
  const [moduleUnlockedLoader, setmoduleUnlockedLoader] = useState(false);
  const [videotokenLoader, setvideotokenLoader] = useState(false);
  const [sessionData, setsessionData] = useState([]);
  const [structureId, setstructureId] = useState("");
  const [sessionModuleData, setsessionModuleData] = useState({});
  const { enrollmentId, sessionId } = useParams();
  const [meetingData, setmeetingData] = useState({});
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const icons = {
    Values: icon1,
    "Card Game": icon2,
    "Wheel of Life": icon3,
    "Goal Settings": icon4,
    "Find your Motivation": icon5,
    "Habit Tracker": icon6,
    "Who am I": icon7,
  };

  const fetchProfile = async () => {
    try {
        setLoading(true)
        const res = await getCoachProfile()
        setProfile(res?.data?.user)
    } catch (err) {
        console.log(err)
        setProfile(null)
    } finally {
        setLoading(false)
    }
}

useEffect(()=>{
    fetchProfile()
},[])

console.log(profile)
  const getSessionDetails = async () => {
    setsessionLoader(true);
    const res = await fetchProgramSessionDetails(enrollmentId, sessionId);
    if (res?.success) {
      setsessionData(res?.data);
    }
    setsessionLoader(false);
  };

  const fetchModules = async () => {
    setmoduleLoader(true);
    const res = await fetchProgramSessionModule(enrollmentId);
    if (res?.success) {
      setsessionModuleData(res?.data);
    }
    setmoduleLoader(false);
  };

  const getVideoToken = async () => {
    setvideotokenLoader(true);
    const res = await joinMeeting(enrollmentId, sessionId);
    if (res?.success) {
        console.log(res?.data)
      setmeetingData({
        password: res?.data?.password,
        zak: "", // required when signature role === 1
        sdk: {
          signature: res?.data?.sdk?.signature,
          meeting_number: res?.data?.sdk?.meeting_number,
          sdk_key: res?.data?.sdk?.sdk_key,
        },
      });
      setvideotokenLoader(false);

    }
    setvideotokenLoader(false);
  };

  useEffect(() => {
    getVideoToken();
  }, []);

  useEffect(() => {
    Promise.allSettled([fetchModules(), getSessionDetails()]).catch((err) =>
      console.error(err),
    );
    // getVideoToken()
  }, []);

  const unlockModulefunc = async () => {
    setmoduleUnlockedLoader(true);
    const res = await lockUnlockModules(enrollmentId, structureId);
    if (res?.success) {
      setmoduleUnlockedLoader(false);
      setModal(false);
      fetchModules();
    }
    setmoduleUnlockedLoader(false);
  };

  const ModalFunc = (title, i, program_structure_id) => {
    setTile(title);
    setIndex(i);
    setModal(true);
    setstructureId(program_structure_id);
  };
  return (
    <>
      {motivationModel && (
        <FindYourmotivation
          structureId={structureId}
          setmotivationModel={setmotivationModel}
        />
      )}
      {modal && (
        <ModuleUnlockModal
          moduleUnlockedLoader={moduleUnlockedLoader}
          unlockModulefunc={unlockModulefunc}
          title={title}
          setModal={setModal}
        />
      )}
      {sessionLoader && <DashboardLoader />}
      {!sessionLoader && (
        <div className="dashboard_container">
          <div className="appointes_head_wrapper">
            <h2>{sessionData?.program?.name}</h2>
          </div>

          <div className="appoinment_program_wrapper">
            <div className="appoinment_porgram_img">
              {/* <img src={img} /> */}
              {!videotokenLoader && !loading && <ZoomMeeting meetingData={meetingData} profile={{name:profile?.name,email:profile?.email}} />}
            </div>

            <div className="appoinment_program_details_wrapper">
              <p>Details</p>
              <img src={user} />
              <h4>
                Customer Name: <span>{sessionData?.customer?.name}</span>
              </h4>
              <div className="appoinment_program_name_wrapper">
                <h4>
                  Program Name: <span>{sessionData?.program?.name}</span>
                </h4>
                <h4>
                  Session number: <span>{sessionData?.session_number}</span>
                </h4>
                <h4>
                  Session Duration:{" "}
                  <span>
                    {sessionData?.program?.session_duration_minutes} mins
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div className="customer_journey_wrapper">
            {moduleLoader && (
              <div
                style={{
                  height: "30vh",
                  position: "relative",
                }}
              >
                <ModalLoader />
              </div>
            )}
            {!moduleLoader && (
              <>
                <h2>Customer Journey</h2>
                <div className="customer_journey_cards_wrapper">
                  {sessionModuleData?.modules?.map((e, i) => {
                    if (
                      e?.title != "Upload Documents" &&
                      e?.title != "Quotes"  &&
                      !e?.module_type?.startsWith("intermediate")
                    ) {
                      return (
                        <div
                          onClick={() =>
                            e.is_locked &&
                            ModalFunc(e.title, i, e?.program_structure_id)
                          }
                          className="customer_journey_card"
                        >
                          <img
                            src={e.is_unlocked ? tick : e.is_locked ? lock : ""}
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                            }}
                          />
                          <img src={icons[e?.title]} />
                          <p>{e.title}</p>
                          {e.is_unlocked && !e?.module_type?.startsWith("intermediate") && (
                            <p
                              style={{
                                color: "var(--primary-color)",
                                textDecoration: "underline",
                                fontWeight: "600",
                              }}
                              onClick={(event) => {
                                const links = {
                                  Values: `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/values/${e?.title == "Values" && e?.program_structure_id}`,
                                  "Wheel of Life": `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/wheel-of-life/${e?.title == "Wheel of Life" && e?.program_structure_id}`,
                                  "Who am I": `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/who-am-i/${e?.title == "Who am I" && e?.program_structure_id}`,
                                  "Card Game": `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/card-game/${e?.title == "Card Game" && e?.program_structure_id}`,
                                };
                                if (e?.title == "Find your Motivation") {
                                  setmotivationModel(true);
                                  setstructureId(e?.program_structure_id);
                                }
                                event.stopPropagation();
                                navigate(links[e?.title]);
                              }}
                            >
                              View
                            </p>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AppoinmentPrograms;
