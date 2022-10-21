import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css"

const URepo = () =>  {
    const [uname, setUname] = useState("");
    const [reponame, setReponame] = useState("")
    const [iserror, setError] = useState({status: false, msg: ""})
    const [contributionList, setContributionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleURepo = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const res = await axios.get(`https://api.github.com/repos/${uname}/${reponame}/contributors`)
                              .catch(() => {
                                setContributionList([]);
                                setError({status: true, msg: "Incorrect Username or Repository Name"})
                            });
      setLoading(false);
        if(res?.data){
            setError({status:false, msg: ""});
            setContributionList(res.data);
      }
    }
    type HTMLInputElementStringValue = React.FormEvent<HTMLInputElement>&{target: { value:string}}
    return (
    <div className={styles.main2}>
        <div className={styles.card}>
            <h1>{(contributionList.length != 0)?"Search Another Repository with Username" : "Search Repository with Username"}</h1>
            <form className={styles.formbox} onSubmit={handleURepo}>
                <input spellCheck="false" name='uname' type={"text"} placeholder='Username' onInput={(e : HTMLInputElementStringValue) => setUname(e.target.value)} />
                <input spellCheck="false" name='rname' type={"text"} placeholder='Repository' onInput={(e : HTMLInputElementStringValue) => setReponame(e.target.value)} />
                <button type={"submit"}>Search</button>
            </form>
        </div>
        {iserror.status?<div className={styles.wrapper}><div className={styles.errorbox}>{iserror.msg}</div></div>:null}
        {loading?<Image src={"/loadingCircle.gif"} alt="loading" width={20} height={20} />:null}
                <div className={styles.listbox}>
            {!iserror.status? contributionList.map((list:any, index) => {
                return (
                    <div className={styles.listblock} key={index}>
                        <div className={styles.hobox}>
                            <Image className={styles.uimg} loader={()=>list.avatar_url} src = {list.avatar_url} alt="User Profile" width={40} height={40} />
                            <span>{list.login}</span>
                        </div>
                        <div>
                            Contribution: {list.contributions}
                        </div>
                    </div>
                )
            }):null}
        </div>
    </div>
  )
}

export default URepo
