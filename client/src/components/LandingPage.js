// components/LandingPage.js

import React from 'react';

const LandingPage = () => (
    <div>
        <h3>User Stories</h3>
        <ul>
            <li>As an unauthenticated user, I can login with Twitter.</li>
            <li>As an authenticated user, I can link to images.</li>
            <li>As an authenticated user, I can delete images that I've linked to.</li>
            <li>As an unauthenticated user, I can browser other users' walls of images.</li>
            <li>As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image.</li>
        </ul>
    </div>
);

export default LandingPage;
