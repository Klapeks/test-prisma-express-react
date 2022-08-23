import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, useUser } from '../Data';
import './Profile.scss'

function Profile(props: {user: number}) {
    const user = useUser(props.user);
    console.log(`profile rerender ${props.user}`, user)
    return (
        <div className="profile">
            <p>{user?.name}</p>
        </div>
    );
}
  
export default Profile;