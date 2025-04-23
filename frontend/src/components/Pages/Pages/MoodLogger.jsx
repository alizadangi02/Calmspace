import React, { useState, useEffect } from "react";
import DiscreteSliderMarks from "../DiscreteSliderMarks";
import Swal from "sweetalert2";
import { addMoodEntryAPI, getUserMoodAPI } from "../../utils/apiRequest";
import Logo from "../Logo";

const MoodLogger = () => {
  const [mood, setMood] = useState({
    stress: 50,
    happiness: 50,
    energy: 50,
    focus: 50,
    calmness: 50,
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [quote, setQuote] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const moodData = await getUserMoodAPI();
        if (moodData.length > 0) {
          setMood(moodData[moodData.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchMoodData();
  }, []);

  const handleChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getHighestMood = () => {
    const moodScores = { stress: mood.stress, happiness: mood.happiness, energy: mood.energy, focus: mood.focus, calmness: mood.calmness };
    return Object.keys(moodScores).reduce((a, b) => moodScores[a] > moodScores[b] ? a : b);
  };

  const getMoodQuote = (moodType) => {
    const quotes = {
      stress: "Take a deep breath. It's just a bad day, not a bad life.",
      happiness: "Happiness is not by chance, but by choice.",
      energy: "Energy and persistence conquer all things.",
      focus: "Focus on the journey, not the destination.",
      calmness: "Keep calm and carry on.",
    };
    return quotes[moodType] || "Stay positive!";
  };

  const getMoodSuggestion = (moodType) => {
    const suggestions = {
      stress: "Try some meditation or deep breathing exercises to relax.",
      happiness: "Keep spreading positivity and maybe share it with others!",
      energy: "Channel that energy into a productive task or exercise!",
      focus: "Use this focus to knock out some tasks or work on a project.",
      calmness: "Maintain this calmness by engaging in a peaceful activity like reading.",
    };
    return suggestions[moodType] || "Take care of yourself!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { calmness, date, description, energy, focus, happiness, stress } = mood;
    if (!calmness || !date || !description || !energy || !focus || !happiness || !stress) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    try {
      await addMoodEntryAPI(mood);

      const highestMood = getHighestMood();
      setQuote(getMoodQuote(highestMood));
      setSuggestion(getMoodSuggestion(highestMood));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your mood entry has been logged successfully.",
      });

      setMood({
        stress: 50,
        happiness: 50,
        energy: 50,
        focus: 50,
        calmness: 50,
        description: "",
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error("Could not log mood:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not log your mood. Please try again.",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#0d0d0d", minHeight: "100vh", padding: "2rem", position: "relative", fontFamily: "'Poppins', sans-serif" }}>
      
      <div style={{ position: "fixed", top: "20px", left: "20px", zIndex: 1000 }}>
        <Logo />
      </div>

      <div style={{ maxWidth: "750px", margin: "6rem auto 2rem", backgroundColor: "#111", borderRadius: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.6)", padding: "2rem", border: "1px solid #222" }}>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", color: "#fafafa", marginBottom: "1.5rem" }}>
          Mood Logger
        </h1>

        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", color: "#ccc", marginBottom: "2rem", fontSize: "1.2rem" }}>
            How are you feeling today?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {["stress", "happiness", "energy", "focus", "calmness"].map((moodType) => (
              <div key={moodType}>
                <label style={{ fontSize: "1rem", color: "#eee", fontWeight: "600", marginBottom: "0.5rem", display: "block" }}>
                  {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
                </label>
                <DiscreteSliderMarks value={mood[moodType]} onChange={(value) => handleChange(moodType, value)} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <label style={{ fontSize: "1rem", color: "#eee", fontWeight: "600", marginBottom: "0.5rem", display: "block" }}>
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Write about your day..."
              value={mood.description}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid #444",
                backgroundColor: "#1a1a1a",
                color: "#f5f5f5",
                resize: "none",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <label style={{ fontSize: "1rem", color: "#eee", fontWeight: "600", marginBottom: "0.5rem", display: "block" }}>
              Date
            </label>
            <input
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={mood.date}
              onChange={(e) => handleChange("date", e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem",
                borderRadius: "10px",
                border: "1px solid #444",
                backgroundColor: "#1a1a1a",
                color: "#f5f5f5",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "1rem",
              fontSize: "1.2rem",
              background: "linear-gradient(135deg, #6B46C1, #805AD5)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
          >
            Log Mood
          </button>
        </form>

        {quote && (
          <div style={{ marginTop: "2rem", textAlign: "center", color: "#f0f0f0" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>Your Mood Quote:</h3>
            <p style={{ fontSize: "1.1rem" }}>{quote}</p>
          </div>
        )}

        {suggestion && (
          <div style={{ marginTop: "1.5rem", textAlign: "center", color: "#f0f0f0" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>Suggestion:</h3>
            <p style={{ fontSize: "1.1rem" }}>{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodLogger;
