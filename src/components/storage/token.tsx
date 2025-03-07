import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_URL, TEST_ORIGIN } from '../config/config';

const REFRESH_THRESHOLD = 0;

export async function challenge(address: string): Promise<string> {
    const response = await axios.get(
        API_URL.Challenge,
        {
            params: {
                address,
            },
            headers: {
                'Content-Type': 'application/json',
                'Origin': TEST_ORIGIN
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
    console.log(response.data);

    return response.data;
}

export async function login(message: string, signature: string): Promise<{ accessToken: string, refreshToken: string }> {
    const response = await axios.post(
        API_URL.Login,
        {
            "message": message,
            "signature": signature
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }
    console.log(response.data);

    return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
    };
}

export async function refresh(refreshToken: string): Promise<string> {
    const response = await axios.post(
        API_URL.REFRESH,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            },
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    return response.data.accessToken;
}

export async function getUserInfo(accessToken: string): Promise<{ points: number, referrals: number, space: number, invitedCode: string }> {
    const response = await axios.get(
        API_URL.USER_INFO,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}: ${response.data}`);
    }

    return {
        points: response.data.Points,
        referrals: response.data.Referrals,
        space: response.data.Space,
        invitedCode: response.data.InvitedCode,
    };
}

export function setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export async function getToken(): Promise<{ accessToken: string, refreshToken: string } | null> {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (isTokenExpire(accessToken, REFRESH_THRESHOLD)) {
        if (isTokenExpire(refreshToken, 0)) {
            const newAccessToken = await refresh(refreshToken);
            localStorage.setItem("accessToken", newAccessToken);
            return {
                accessToken: newAccessToken,
                refreshToken: refreshToken
            };
        } else {
            localStorage.clear();
            return null;
        }
    }

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

export function clear() {
    localStorage.clear();
}

export function checkExpire(): boolean {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken ? isTokenExpire(refreshToken, 0) : true;
}

function isTokenExpire(token: string, threshold: number): boolean {
    const payload = jwtDecode(token);
    if ((payload.exp - threshold) * 1000 > Date.now()) {
        return false;
    }
    return true;
}

export async function AddPoint(actionid: number) {
    const accessToken = localStorage.getItem("accessToken");
    try {
        const response = await axios.post(
            API_URL.POINT_ADD,
            {
                params: { "tokenId": actionid },

            },
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            },
        );
        if (response.status === 200) {
            console.log("Add Point: ", response.data, actionid);
        }

    } catch (error) {
        console.error("add point", error)
    }

}