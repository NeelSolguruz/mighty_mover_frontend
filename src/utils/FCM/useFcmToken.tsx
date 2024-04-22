import { useState, useEffect } from "react";
import { getMessaging } from "firebase/messaging";
import firebaseApp from "../firebase/firebase";
import { getToken } from "firebase/messaging";


const useFcmToken = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                const messaging = getMessaging(firebaseApp);
                const currentToken = await getToken(messaging, { vapidKey: "BBP1UJVh9UxGFe7gLtNQaTddc-DwPVb7jLWes9_mKMKcujxLiHEJ-yFocWwyM_fZ770UjlhVuw8wuEpvvbHNyuk" });
                if (currentToken) {
                    setToken(currentToken);
                } else {
                    console.error('No FCM token available');
                }
            } catch (error) {
                console.error('Error retrieving FCM token:', error);
            }
        };


        retrieveToken();
    }, []);

    return token;
};

export default useFcmToken;




