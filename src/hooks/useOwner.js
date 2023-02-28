import { useState } from 'react';

export default function useOwner() {
  const [owner, setOwner] = useState([]);
  return { owner, setOwner };
}
