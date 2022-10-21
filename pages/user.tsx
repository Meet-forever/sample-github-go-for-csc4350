import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css"

const User = ({data}: {data:any}) =>  {
    const [userdata, setUserData] = useState(data)
    const [uname, setUname] = useState("");
    const [iserror, setError] = useState({status: false, msg: ""})
    const [userRepoList, setUserRepoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleUname = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users/${uname}`)
                              .catch(() => setError({status: true, msg: "Incorrect Username"}));
      setLoading(false);
        if(res?.data){
            setLoading(true)
            const res2 = await axios.get(`https://api.github.com/users/${uname}/repos`);
            setLoading(false);
            setError({status:false, msg: ""});
            setUserData(res.data)
            setUserRepoList(res2.data);
      }
    }
    type HTMLInputElementStringValue = React.FormEvent<HTMLInputElement>&{target: { value:string}}
    return (
    <div className={styles.main2}>
        <div className={styles.card}>
            <h1>{userdata?"Search Another User" : "Search User"}</h1>
            <form className={styles.formbox} onSubmit={handleUname}>
                <input spellCheck="false" name='uname' type={"text"} placeholder='Username' onInput={(e : HTMLInputElementStringValue) => setUname(e.target.value)} />
                <button type={"submit"}>Search</button>
            </form>
        </div>
        {loading?<Image src={"/loadingCircle.gif"} alt="loading" width={20} height={20} />:null}
        {userdata?
            <div className={styles.wrapper}>
                <div className={styles.ucard}>
                    <div>
                        <Image className={styles.uimg} loader={()=>userdata.avatar_url} src={userdata.avatar_url} alt={"User's profile"} width ={100} height={100}></Image>
                    </div>
                    <div>
                        <div>Username:&nbsp;{userdata.login}</div>
                        <div>Name:&nbsp;{userdata.name}</div>
                        <div>Number of Public Repos:&nbsp;{userdata.public_repos}</div>
                        <div>Created Account:&nbsp;{userdata.created_at}</div>
                        <div>Last Seen:&nbsp;{userdata.updated_at}</div>
                    </div>
                </div>
            </div>:null
        }
        {iserror.status?<div className={styles.wrapper}><div className={styles.errorbox}>{iserror.msg}</div></div>:null}
        <div className={styles.listbox}>
            {userRepoList.map((list:any, index) => {
                return (
                    <div className={styles.listblock} key={index}>
                        <div>
                            <a href={list.html_url}>{list.name}</a>
                        </div>
                        <div>
                            <span>Fork : {list.forks_count}</span>
                            <br/>
                            <span>Last Updated: {list.updated_at}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default User