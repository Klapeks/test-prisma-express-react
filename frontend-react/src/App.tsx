import { useState } from 'react';
import './App.scss'
import Posts from './components/Posts';
import Profile from './components/Profile';
import Users from './components/Users';
import { User } from './Data';

function App() {
    const [selectedUserId, setSelectedUserId] = useState(-1);
    function setUser(user: User | number | string) {
        if (typeof user === "string") user = parseInt(user);
        if (typeof user === "object") user = user.id;
        setSelectedUserId(user);
        console.log("Select user: " + user);
    }
    return (
        <div className="container">
            <Users selectedUser={selectedUserId} selectUser={setUser}/>
            <div className='right'>
                <Profile user={selectedUserId}/>
                <Posts user={selectedUserId}/>
            </div>
        </div>
    );
}

export default App;
