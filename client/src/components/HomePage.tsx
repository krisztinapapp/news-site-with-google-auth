import React, { useState, useEffect } from 'react';
import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';

function HomePage() {
    const [ user, setUser ] = useState<CredentialResponse | undefined>(undefined);

    const handleLogOut = () => {
        googleLogout();
        setUser(undefined);
    };

    return (
        <div>
        <h1>News Site App</h1>
            {user ? (
            <div>
                <button onClick={handleLogOut}>Log out</button>
            </div>
        ) : (
            <div>
            <GoogleLogin
                onSuccess={res => { console.log(res); setUser(res); }}
                onError={() => { console.log('Error logging in.'); }}
            />;
            </div>
        )}
        </div>
    )
}

export default HomePage;