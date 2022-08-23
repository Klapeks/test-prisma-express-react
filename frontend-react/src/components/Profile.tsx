import { User } from '../Data';
import './Profile.scss'

function Profile(props: {user: User | undefined}) {
    const user = props.user;
    return (
        <div className="profile">
            <p>{user?.name}</p>
        </div>
    );
}
  
export default Profile;