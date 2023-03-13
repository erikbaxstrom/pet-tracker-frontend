import { useEffect, useState } from 'react';

export default function useLocal() {
  const [localUser, setLocalUser] = useState('');

  const saveLocalUser = () => {
    if (localUser.length !== 0) {
      localStorage.setItem('localUser', JSON.stringify(localUser));
    }
  };

  const getLocalUser = () => {
    if (localStorage.getItem('localUser') === null) {
      localStorage.setItem('localUser', JSON.stringify(''));
    } else {
      let thisUser = JSON.parse(localStorage.getItem('localUser'));
      setLocalUser(thisUser);
    }
  };

  useEffect(() => {
    getLocalUser();
  });

  useEffect(() => {
    saveLocalUser();
  });

  return { localUser, setLocalUser };
}
