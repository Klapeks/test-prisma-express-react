import './App.scss'
import Posts from './components/Posts';
import Profile from './components/Profile';
import Users from './components/Users';

function App() {
    return (
        <div className="container">
            <Users/>
            <div className='right'>
                <Profile/>
                <Posts/>
            </div>
        </div>
    );
}

export default App;
