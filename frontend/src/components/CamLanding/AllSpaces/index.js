import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SHeader from '../SHeader'
import './index.css'

function Index() {

    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/api/user/allUsers').then((res) => {
            setUsers(res.data)
        })
    }, [])

    return (<>
        <SHeader />
        <div className = 'top-box'>
            <div className = 'top-box-container'>
            <h3>Welcome to SLIET!</h3>
            <p>Follow SLIETIANS to explore your interestes on CAMPUSLIEN</p>
            </div>
            <div className = 'main-content'>
                <h2>DISCOVER ALL SLIETIANS</h2>
                <p>Check out all these SLIETIANS</p>
                <div className = 'userCards'>
                    {
                        users.map((_user) => (<>
                        <div className = 'userCard'>
                        <div className = 'userCards-content'>
                        <div className ='user-cover-img'>
                            {/* <img src = 'https://qphs.fs.quoracdn.net/main-custom-tc-1932347-320x64-cpowfrcsrqmcaddukabeezznabfqjtou.jpeg' alt ='converImage' /> */}
                        </div>
                        <div className = 'user-profile-img'>
                            {/* <img src="https://qphs.fs.quoracdn.net/main-thumb-ti-1932347-100-zmrqrduiusnaxdjolxgirondyjupjrke.jpeg" alt ='profileImage' /> */}
                        </div>
                        <h3>{_user.name? _user.name : String(_user.email).split('@')[0]  }</h3>
                        <p>{_user.email}</p>
                    </div>
                    </div>
                        </>))
                    }    
                </div>
            </div>
        </div>
    </>)
}

export default Index
