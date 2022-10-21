import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css"

const URepo = ({data}: {data:any}) =>  {
    const [userdata, setUserData] = useState(data)
    const [uname, setUname] = useState("");
    const [reponame, setReponame] = useState("")
    const [iserror, setError] = useState({status: false, msg: ""})
    const handleURepo = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    //   const res = await axios.get(`https://api.github.com/users/${uname}`)
    //                           .catch(() => setError({status: true, msg: "Incorrect Username"}));
    //   if(res?.data){
    //     setError({status:false, msg: ""});
    //     setUserData(res.data)
    //   }
    }
    type HTMLInputElementStringValue = React.FormEvent<HTMLInputElement>&{target: { value:string}}
    return (
    <div className={styles.main2}>
        <div className={styles.card}>
            <h1>{userdata?"Search Another Repository with Username" : "Search Repository with Username"}</h1>
            <form className={styles.formbox} onSubmit={handleURepo}>
                <input spellCheck="false" name='uname' type={"text"} placeholder='Username' onInput={(e : HTMLInputElementStringValue) => setUname(e.target.value)} />
                <input spellCheck="false" name='rname' type={"text"} placeholder='Repository' onInput={(e : HTMLInputElementStringValue) => setReponame(e.target.value)} />
                <button type={"submit"}>Search</button>
            </form>
        </div>
        {userdata?
            <div className={styles.wrapper}>
                <div className={styles.ucard}>
                    <div>
                        <Image className={styles.uimg} loader={()=>userdata.avatar_url} src={userdata.avatar_url} alt={"User's profile"} width ={100} height={100}></Image>
                    </div>
                    <div>
                        <div>Username : {userdata.login}</div>
                        <div>Name : {userdata.name}</div>
                        <div>Number of Public Repos : {userdata.public_repos}</div>
                        <div>Created Account : {userdata.created_at}</div>
                        <div>Last Seen: {userdata.updated_at}</div>
                    </div>
                </div>
            </div>:null
        }
        {iserror.status?<div className={styles.wrapper}><div className={styles.errorbox}>{iserror.msg}</div></div>:null}
    </div>
  )
}

export default URepo
