import { useState } from "react";

import { HomeMatchedScreen } from "@components/home/HomeMatchedScreen";
import { HomeUnmatchedScreen } from "@components/home/HomeUnmatchedScreen";

export default function HomeScreen() {
  const [devShowMatched, setDevShowMatched] = useState(false);
  const showMatchedHome = __DEV__ && devShowMatched;

  if (showMatchedHome) {
    return <HomeMatchedScreen onDevBack={() => setDevShowMatched(false)} />;
  }

  return <HomeUnmatchedScreen onDevShowMatched={() => setDevShowMatched(true)} />;
}
