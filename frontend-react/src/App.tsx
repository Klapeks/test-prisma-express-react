import { useRef, useState } from 'react';
import './App.scss'
import NewUser from './components/NewUser';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Users from './components/Users';
import { User } from './Data';

function App() {
    const [selectedUser, selectUser] = useState<User>();
    const newUserWindowRef = useRef<HTMLDivElement>(null);
    function openUserCreateMenu() {
        if (!newUserWindowRef) return;
        newUserWindowRef.current?.classList.add("activate");
    }
    return (
        <div className="container">
            <Users {...{selectedUser, selectUser, openUserCreateMenu}}/>
            <div className='right'>
                <Profile user={selectedUser}/>
                <Posts user={selectedUser}/>
            </div>
            <NewUser refr={newUserWindowRef}/>
        </div>
    );
}

export default App;
