
import React, { useState, useContext } from 'react';
import styles from './Dashboard.module.css';

import robotPic from '../../assets/robot.png';
import Skeleton from '@mui/material/Skeleton';

import axios from '../../utils/axios';
import { AuthContext } from '../../utils/HOC/AuthContext';

const Dashboard = () => {
  const [uploadFiletext,setUploadFileText] =useState("upload your resume");
  const [loading,setLoading] = useState(false);
  const [resumeFile,setResumeFile] =useState(null);
  const [jobDesc,setJobDesc] =useState("");
  const [result,setResult] =useState(null);
  const {userInfo} =useContext(AuthContext);
 console.log("userInfo:", userInfo);


  const handleOnChangeFile=(e)=>{
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name)
  }
   
  const handleUpload=async()=>{
    setResult(null)
    if(!userInfo){
      alert("Login First");
      return;
   }

    if(!jobDesc || !resumeFile){
      alert("Please Fill Job Description & Upload Resume");
      return ;
    }
    const formData=new FormData();
    formData.append("resume",resumeFile);
    formData.append("job_desc",jobDesc);
    formData.append("user",userInfo._id);
    //formData.append("user","6829a3f2a8b4c123456789ab");
    setLoading(true)
    try{
      const result=await axios.post('/api/resume/addResume',formData);
      setResult(result.data.data)
    }catch(err){
      console.log(err);

    }finally{
      setLoading(false)
    }

  }

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>

        <div className={styles.DashboardHeaderTitle}>Smart Resume Analyzer</div>
        <div className={styles.DashboardHeaderLargeTitle}>Resume Match Score</div>

        <div className={styles.alertInfo}>
          <div>⚠️ Important Instrutions:</div>
          <div className={styles.dashboardInstructions}>
            <div>• Please paste the complete job description in the "Job Description" field before submitting.</div>
            <div>• Only PDF format (.pdf) resumes are accepted.</div>
          </div>
        </div>

        {/* NEW: flex row wrapper */}
        <div className={styles.uploadAnalyzeRow}>

          {/* LEFT: upload + textarea */}
          <div className={styles.uploadArea}>

            <div className={styles.uploadSection}>
              <div className={styles.uploadTitle}>Upload Your Resume</div>
              <div className={styles.uploadRow}>
                <input
  type="file"
  accept=".pdf"
  id="inputField"
  className={styles.fileInput}
  onChange={handleOnChangeFile}
/>
                <button className={styles.uploadBtn}>Upload Resume</button>
              </div>
            </div>

            <div className={styles.jobDescriptionSection}>
              <div className={styles.jobTitle}>Paste Job Description</div>
              <textarea
   value={jobDesc}
   onChange={(e)=>setJobDesc(e.target.value)}
   className={styles.textArea}
   placeholder="Paste Your Job Description"
   rows={10}
   cols={50}
/>
            </div>

          </div>

          {/* RIGHT: analyze button */}
          <div className={styles.analyzeContainer}>
            <button className={styles.analyzeBtn} onClick={handleUpload}>Analyze</button>
          </div>

        </div>

      </div>


      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
           <div>Analyze wiht AI</div>
                        <img className={styles.profileImg}
                      src={userInfo?.photoUrl}
                      referrerPolicy="no-referrer"/>
                      <h1>{userInfo?.name}</h1>
                 
        </div>

        {
          result &&<div className={styles.DashboardRightTopCard}>
           <div>Result</div>
                <div style={{display:"flex",justifyContent:"center",alignItem:"center",gap:20}}>
               <h1>{result?.score}%</h1>
                </div>
                <div className={styles.feedback}>
                  <h3>FeedBack</h3>
                  <p>{result?.feedback}</p>
                </div>
        </div>       
        }
      {
      loading && <Skeleton variant="rectangular" sx={{borderRadius :"20px"}} width={280} height={280}/>
}
       </div> 
    </div>
  )
}

export default Dashboard