import { useEffect, useState } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, get } from 'firebase/database';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isVerified: boolean;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser);
      setIsLoading(true);

      if (firebaseUser) {
        const uid = firebaseUser.uid;
        console.log('User is logged in with UID:', uid);

        try {
          const snapshot = await get(ref(db, `Regist/${uid}`));

          if (snapshot.exists()) {
            console.log('User profile exists:', true);
            const userProfile = snapshot.val();

            const boundDeviceId = userProfile.DeviceId;
            const currentDeviceId = localStorage.getItem('app_deviceId');

            console.log('Device in DB:', boundDeviceId);
            console.log('Device in localStorage:', currentDeviceId);

            if (boundDeviceId && currentDeviceId && boundDeviceId === currentDeviceId) {
              setUser(firebaseUser);
              setIsVerified(true);
            } else {
              console.warn('Device verification failed.');
              setUser(null);
              setIsVerified(false);
            }
          } else {
            console.warn('No user profile found in DB.');
            setUser(null);
            setIsVerified(false);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
          setIsVerified(false);
        }
      } else {
        console.log('User is not logged in.');
        setUser(null);
        setIsVerified(false);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading, isVerified };
};
