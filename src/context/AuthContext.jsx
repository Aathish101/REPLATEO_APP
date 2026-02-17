import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { googleProvider } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* =========================
     🔄 AUTH STATE
  ========================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: data.name || firebaseUser.displayName || "",
            role: data.role || "user",
            licenceId: data.licenceId || null,
            isAdmin: data.role === "admin",
          });
        } else {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: "user",
            isAdmin: false,
          });
        }
      } catch (err) {
        console.error("Auth load error:", err);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsub();
  }, []);

  /* =========================
     🔐 LOGIN
  ========================= */
  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password required");
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* =========================
     � PASSWORD RESET
  ========================= */
  const resetPassword = async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Password reset email sent" };
    } catch (err) {
      console.error("Password reset error:", err.code);

      if (err.code === "auth/user-not-found") {
        throw new Error("No account found with this email");
      }
      if (err.code === "auth/invalid-email") {
        throw new Error("Invalid email address");
      }

      throw new Error("Password reset failed");
    }
  };

  /* =========================
     ���📝 REGISTER (AFTER OTP VERIFIED)
  ========================= */
  const register = async ({ email, password, name, role, licenceId }) => {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, { displayName: name });

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        role,
        licenceId: role === "ngo" ? licenceId : null,
        createdAt: serverTimestamp(),
      });

      return cred.user;
    } catch (err) {
      console.error("Firebase register error:", err.code);

      if (err.code === "auth/email-already-in-use") {
        throw new Error("Email already registered");
      }
      if (err.code === "auth/invalid-email") {
        throw new Error("Invalid email address");
      }

      throw new Error("Registration failed");
    }
  };

  /* =========================
     🔵 GOOGLE LOGIN
  ========================= */
  const googleLogin = async (role) => {
    const res = await signInWithPopup(auth, googleProvider);
    const ref = doc(db, "users", res.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        role,
        licenceId: role === "ngo" ? "PENDING" : null,
        createdAt: serverTimestamp(),
      });
    }
  };

  /* =========================
     🚪 LOGOUT
  ========================= */
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        googleLogin,
        resetPassword,
      }}
    >
      {!authLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
