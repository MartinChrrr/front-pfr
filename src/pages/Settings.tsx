import { useState } from "react";
import { User, Wrench } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import ProfileSettingsForm from "../components/forms/ProfileSettingsForm";
import ConfigurationSettingsForm from "../components/forms/ConfigurationSettingsForm";

type Tab = "profile" | "configuration";

const tabs: { key: Tab; label: string; icon: typeof User }[] = [
  { key: "profile", label: "Mon compte", icon: User },
  { key: "configuration", label: "Ma configuration", icon: Wrench },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile: onglets horizontaux */}
        <nav className="flex md:hidden gap-1 border-b border-text-placeholder">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-primary-300 text-primary-700"
                    : "text-text-placeholder hover:text-primary-700"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop: barre latérale */}
        <nav className="hidden md:flex w-[220px] shrink-0 flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "border-l-4 border-primary-300 bg-white text-primary-700 shadow-sm"
                    : "text-text-placeholder hover:bg-white/60"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1 rounded-xl bg-white p-4 md:p-8 shadow-sm">
          {activeTab === "profile" ? (
            <ProfileSettingsForm />
          ) : (
            <ConfigurationSettingsForm />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
