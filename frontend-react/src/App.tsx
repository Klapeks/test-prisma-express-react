import { useRef, useState } from 'react';
import './App.scss'
import NewUser from './components/NewUser';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Users from './components/Users';
import { User } from './Data';

function App() {
    const [selectedUser, selectUser] = useState<User>();
    const [users, setUsers] = useState<Array<User>>([]);
    const newUserWindowRef = useRef<HTMLDivElement>(null);

    function addUser(user: User) {
        setUsers([...users, user]);
    }

    function openUserCreateMenu() {
        if (!newUserWindowRef) return;
        newUserWindowRef.current?.classList.add("activate");
        setTimeout(() => newUserWindowRef.current?.classList.add("show"));
    }
    return (
        <div className="container">
            <Users {...{selectedUser, selectUser, openUserCreateMenu, users, setUsers}}/>
            <div className='right'>
                <Profile user={selectedUser}/>
                <Posts user={selectedUser}/>
            </div>
            <NewUser refr={newUserWindowRef} {...{addUser}}/>
        </div>
    );
}

export default App;
