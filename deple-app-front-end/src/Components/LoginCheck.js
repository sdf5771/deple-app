import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const LoginCheck = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);

    return cookies;
};

export default LoginCheck;