import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api'; // Keep api for data, but not for auth token

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Determine display name
                const userData = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    photoURL: currentUser.photoURL
                };
                setUser(userData);

                // IMPORTANT: For a hackathon, we might just use the UID as the token/identifier 
                // for backend headers or skip backend auth checks for READ ops.
                // api.defaults.headers.common['Authorization'] = `Bearer ${currentUser.accessToken}`;
            } else {
                setUser(null);
                // delete api.defaults.headers.common['Authorization'];
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            // Firebase error messages are descriptive but code-based, mapping simply here
            let msg = "Login failed";
            if (error.code === 'auth/invalid-credential') msg = "Invalid email or password.";
            if (error.code === 'auth/user-not-found') msg = "User not found.";
            if (error.code === 'auth/wrong-password') msg = "Invalid password.";
            return { success: false, error: msg };
        }
    };

    const register = async (fullName, email, password, role) => {
        try {
            // 1. Create User in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Update Firebase Profile
            await updateProfile(userCredential.user, {
                displayName: fullName
            });

            // 3. Create User in Backend (Sync) - IMPORTANT: We use a fixed ID for demo but in real app we'd map UID
            // For this hackathon demo, we are updating the "Demo User 1" to match new signup temporarily
            // or we could just ignore backend creation if we stick to ID 1.
            // BUT, to satisfy the user request of "adding his/her current position", we should update the backend user.

            // Let's assume we update the "current" backend user (ID 1) with this new info for the demo flow
            await api.put('/users/1', {
                full_name: fullName,
                current_role_title: role || "Student"
            });

            setUser({
                uid: userCredential.user.uid,
                email: email,
                name: fullName
            });
            return { success: true };
        } catch (error) {
            console.error("Register failed", error);
            let msg = "Registration failed";
            if (error.code === 'auth/email-already-in-use') msg = "Email already in use.";
            if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
            return { success: false, error: msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
