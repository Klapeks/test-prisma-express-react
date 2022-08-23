import { useState } from 'react';
import './App.scss'
import Posts from './components/Posts';
import Profile from './components/Profile';
import Users from './components/Users';
import { User } from './Data';

function App() {
    const [selectedUser, selectUser] = useState<User>();
    return (
        <div className="container">
            <Users selectedUser={selectedUser} selectUser={selectUser}/>
            <div className='right'>
                <Profile user={selectedUser}/>
                <Posts user={selectedUser}/>
            </div>
        </div>
    );
}

export default App;
