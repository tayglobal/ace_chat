import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    set({ isLoading: true });

    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
  signOutUser: async () => {
    set({ isLoading: true });
    try {
      await signOut(auth);
      set({ currentUser: null, isLoading: false });
    } catch (err) {
      console.log(err);
      set({ isLoading: false });
    }
  },
}));
