import React, { useEffect, useState } from "react";
import {
  Bell, Shield, Target, Globe, Mail,
  DollarSign, Save, RotateCcw
} from "lucide-react";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { currentUser, userData } = useAuth(); // userData.role
  const isAdmin = userData?.role === "admin";

  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  /* =========================
     LOAD SETTINGS
  ========================= */
  useEffect(() => {
    const loadSettings = async () => {
      const ref = doc(db, "settings", "global");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setSettings(snap.data());
      }
    };

    if (isAdmin) loadSettings();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        🚫 Admin access only
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-screen text-orange-500">
        <div className="animate-spin h-10 w-10 border-b-2 border-orange-500 rounded-full"></div>
      </div>
    );
  }

  /* =========================
     HANDLERS
  ========================= */
  const toggle = (path) => {
    const keys = path.split(".");
    const updated = { ...settings };
    let obj = updated;

    while (keys.length > 1) obj = obj[keys.shift()];
    obj[keys[0]] = !obj[keys[0]];

    setSettings(updated);
  };

  const update = (path, value) => {
    const keys = path.split(".");
    const updated = { ...settings };
    let obj = updated;

    while (keys.length > 1) obj = obj[keys.shift()];
    obj[keys[0]] = value;

    setSettings(updated);
  };

  const saveAll = async () => {
    setSaving(true);
    await setDoc(doc(db, "settings", "global"), settings);
    setSaving(false);
    alert("Settings saved successfully");
  };

  /* =========================
     TOGGLE COMPONENT
  ========================= */
  const Toggle = ({ value, onClick }) => (
    <div
      onClick={onClick}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
        value ? "bg-orange-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition-transform ${
          value ? "translate-x-6" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="space-y-6 pb-20">

      <h1 className="text-2xl font-bold">Platform Settings</h1>

      {/* NOTIFICATIONS */}
      <Section title="Notifications" icon={Bell}>
        {Object.entries(settings.notifications).map(([k, v]) => (
          <Row key={k} label={k}>
            <Toggle value={v} onClick={() => toggle(`notifications.${k}`)} />
          </Row>
        ))}
      </Section>

      {/* MAINTENANCE */}
      <Section title="Maintenance Mode" icon={Shield}>
        <Row label="Enable Maintenance">
          <Toggle
            value={settings.maintenance}
            onClick={() => toggle("maintenance")}
          />
        </Row>
      </Section>

      {/* GOALS */}
      <Section title="Sustainability Goals" icon={Target}>
        <Input label="Monthly Target (kg)"
          value={settings.goals.monthlyTarget}
          onChange={v => update("goals.monthlyTarget", v)} />
        <Input label="CO₂ Target (tons)"
          value={settings.goals.co2Target}
          onChange={v => update("goals.co2Target", v)} />
        <Input label="New Donors"
          value={settings.goals.newDonors}
          onChange={v => update("goals.newDonors", v)} />
      </Section>

      {/* GENERAL */}
      <Section title="General Settings" icon={Globe}>
        <Input label="Platform Name"
          value={settings.general.platformName}
          onChange={v => update("general.platformName", v)} />
        <Input label="Timezone"
          value={settings.general.timezone}
          onChange={v => update("general.timezone", v)} />
        <Input label="Currency"
          value={settings.general.currency}
          onChange={v => update("general.currency", v)} />
      </Section>

      {/* EMAIL */}
      <Section title="Email Settings" icon={Mail}>
        <Input label="Support Email"
          value={settings.email.support}
          onChange={v => update("email.support", v)} />
        <Input label="Admin Email"
          value={settings.email.admin}
          onChange={v => update("email.admin", v)} />
        <Input label="Notifications Email"
          value={settings.email.notifications}
          onChange={v => update("email.notifications", v)} />
      </Section>

      {/* PRICING */}
      <Section title="Manure Pricing" icon={DollarSign}>
        <Input label="Price per Kg"
          value={settings.pricing.pricePerKg}
          onChange={v => update("pricing.pricePerKg", v)} />
        <Input label="Min Order (kg)"
          value={settings.pricing.minOrderKg}
          onChange={v => update("pricing.minOrderKg", v)} />
      </Section>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => window.location.reload()}
          className="border px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <RotateCcw size={16} /> Reset
        </button>

        <button
          onClick={saveAll}
          disabled={saving}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>
    </div>
  );
};

/* =========================
   SMALL COMPONENTS
========================= */
const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
    <h2 className="font-semibold flex items-center gap-2">
      <Icon className="text-orange-500" size={18} /> {title}
    </h2>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium">{label}</span>
    {children}
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded-lg mt-1"
    />
  </div>
);

export default Settings;
