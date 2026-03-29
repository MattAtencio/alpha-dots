"use client";

import { useState, useCallback } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { LetterSelectScreen } from "@/components/LetterSelectScreen";
import { GameScreen } from "@/components/GameScreen";
import { SettingsScreen } from "@/components/SettingsScreen";
import type { Density } from "@/engine/types";

type Screen = "home" | "select" | "game" | "settings";
type GameMode = "play" | "practice";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [letter, setLetter] = useState("A");
  const [density, setDensity] = useState<Density>("starter");
  const [gameMode, setGameMode] = useState<GameMode>("play");
  const [gameKey, setGameKey] = useState(0);

  const startPlay = useCallback((d: Density) => {
    setGameMode("play"); setDensity(d); setLetter("A");
    setGameKey((k) => k + 1); setScreen("game");
  }, []);

  const startPractice = useCallback(() => { setGameMode("practice"); setScreen("select"); }, []);

  const selectLetter = useCallback((l: string, d: Density) => {
    setLetter(l); setDensity(d); setGameKey((k) => k + 1); setScreen("game");
  }, []);

  const handleNext = useCallback((next: string) => {
    setLetter(next); setGameKey((k) => k + 1);
  }, []);

  const handleGameBack = useCallback(() => {
    setScreen(gameMode === "play" ? "home" : "select");
  }, [gameMode]);

  return (
    <div className="h-full w-full flex flex-col">
      {screen === "home" && <HomeScreen onPlay={startPlay} onPractice={startPractice} onSettings={() => setScreen("settings")} />}
      {screen === "select" && <LetterSelectScreen onBack={() => setScreen("home")} onSelect={selectLetter} />}
      {screen === "game" && <GameScreen key={gameKey} letter={letter} density={density} onBack={handleGameBack} onNext={handleNext} autoAdvance={gameMode === "play"} />}
      {screen === "settings" && <SettingsScreen onBack={() => setScreen("home")} />}
    </div>
  );
}
