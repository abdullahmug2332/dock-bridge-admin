"use client";

import { useState } from "react";
import { Shield, Bell, Settings2, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SlBriefcase } from "react-icons/sl";
import { MdOutlineSecurity } from "react-icons/md";
/* ─────────────────────────────────────────
   Reusable Toggle
───────────────────────────────────────── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
        checked ? "bg-purple-600" : "bg-gray-300",
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-1",
        )}
      />
    </button>
  );
}

/* ─────────────────────────────────────────
   Field wrapper used throughout
───────────────────────────────────────── */
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium text-gray-800">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#ECECF0] border-0 text-sm rounded-md"
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB 1 – General
───────────────────────────────────────── */
function GeneralTab() {
  const [biz, setBiz] = useState({
    name: "Seafood Marketplace",
    email: "contact@seafoodmarketplace.com",
    phone: "(555) 123-4567",
    timezone: "Pacific Time (PT)",
    address: "123 Harbor Drive, Seattle, WA 98101",
  });

  const [ops, setOps] = useState({
    currency: "USD ($)",
    taxRate: "8.5",
    minOrder: "50.00",
    freeShipping: "200.00",
  });

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <SlBriefcase className="text-gray-800 size-5 " />
          <p className="font-semibold text-gray-800 text-sm">
            Business Information
          </p>
        </div>
        <p className="text-xs text-gray-500 mb-4 ml-7">
          Update your marketplace business details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Business Name"
            value={biz.name}
            onChange={(v) => setBiz({ ...biz, name: v })}
          />
          <Field
            label="Business Email"
            value={biz.email}
            onChange={(v) => setBiz({ ...biz, email: v })}
          />
          <Field
            label="Phone Number"
            value={biz.phone}
            onChange={(v) => setBiz({ ...biz, phone: v })}
          />
          <Field
            label="Timezone"
            value={biz.timezone}
            onChange={(v) => setBiz({ ...biz, timezone: v })}
          />
          <div className="md:col-span-2">
            <Field
              label="Business Address"
              value={biz.address}
              onChange={(v) => setBiz({ ...biz, address: v })}
            />
          </div>
        </div>

        <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 h-8">
          Save Changes
        </Button>
      </div>

      {/* Operational Settings */}
      <div className="border border-gray-200 rounded-xl p-5">
        <p className="font-semibold text-gray-800 text-sm mb-0.5">
          Operational Settings
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Configure your marketplace operational parameters
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Currency"
            value={ops.currency}
            onChange={(v) => setOps({ ...ops, currency: v })}
          />
          <Field
            label="Default Tax Rate (%)"
            value={ops.taxRate}
            onChange={(v) => setOps({ ...ops, taxRate: v })}
          />
          <Field
            label="Minimum Order Amount ($)"
            value={ops.minOrder}
            onChange={(v) => setOps({ ...ops, minOrder: v })}
          />
          <Field
            label="Free Shipping Threshold ($)"
            value={ops.freeShipping}
            onChange={(v) => setOps({ ...ops, freeShipping: v })}
          />
        </div>

        <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 h-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB 2 – Notifications
───────────────────────────────────────── */
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    newOrders: true,
    lowStock: true,
    orderUpdates: true,
    supplierUpdates: true,
    marketingEmails: true,
  });

  const [emails, setEmails] = useState({
    notification: "admin@seafoodmarketplace.com",
    cc: "secondary@seafoodmarketplace.com",
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const prefItems = [
    {
      key: "newOrders" as const,
      label: "New Orders",
      desc: "Get notified when new orders are placed",
    },
    {
      key: "lowStock" as const,
      label: "Low Stock Alert",
      desc: "Receive alerts when inventory is running low",
    },
    {
      key: "orderUpdates" as const,
      label: "Get notified when new orders are placed",
      desc: "123 Harbor Drive, Seattle, WA 98101",
    },
    {
      key: "supplierUpdates" as const,
      label: "Supplier Updates",
      desc: "Receive updates from your suppliers",
    },
    {
      key: "marketingEmails" as const,
      label: "Marketing Emails",
      desc: "Receive marketing and promotional emails",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-0.5">
          <Bell className="size-5 text-gray-800" />
          <p className="font-semibold text-gray-800 text-sm">
            Notification Preferences
          </p>
        </div>
        <p className="text-xs text-gray-500 mb-4 ml-6">
          Manage how you receive notifications
        </p>

        <div className="divide-y divide-gray-100">
          {prefItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <Toggle
                checked={prefs[item.key]}
                onChange={() => toggle(item.key)}
              />
            </div>
          ))}
        </div>

        <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 h-8">
          Save Preferences
        </Button>
      </div>

      {/* Email Notifications */}
      <div className="border border-gray-200 rounded-xl p-5">
        <p className="font-semibold text-gray-800 text-sm mb-0.5">
          Email Notifications
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Configure email notification settings
        </p>

        <div className="space-y-4">
          <Field
            label="Notification Email"
            value={emails.notification}
            onChange={(v) => setEmails({ ...emails, notification: v })}
          />
          <Field
            label="CC Email (Optional)"
            value={emails.cc}
            onChange={(v) => setEmails({ ...emails, cc: v })}
          />
        </div>

        <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 h-8">
          Update Email Settings
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TAB 3 – Security
───────────────────────────────────────── */
function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-0.5">
          <MdOutlineSecurity className="size-5 text-gray-800"/>
          <p className="font-semibold text-gray-800 text-sm">
            Security Settings
          </p>
        </div>
        <p className="text-xs text-gray-500 mb-5 ml-7">
          Manage your account security
        </p>

        {/* Create Password */}
        <p className="text-xl font-semibold text-gray-800 mb-3">
          Create Password
        </p>
        <div className="space-y-3">
          <Field
            label="Current Password"
            value={passwords.current}
            onChange={(v) => setPasswords({ ...passwords, current: v })}
            type="password"
            placeholder=""
          />
          <Field
            label="New Password"
            value={passwords.newPass}
            onChange={(v) => setPasswords({ ...passwords, newPass: v })}
            type="password"
            placeholder=""
          />
          <Field
            label="Confirm New Password"
            value={passwords.confirm}
            onChange={(v) => setPasswords({ ...passwords, confirm: v })}
            type="password"
            placeholder=""
          />
        </div>

        <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 h-8">
          Update Password
        </Button>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* Two Factor Authentication */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Two Factor Authentication
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Add an extra layer of security to your account
            </p>
          </div>
          <Toggle checked={twoFactor} onChange={setTwoFactor} />
        </div>

        <Button
          variant="outline"
          className="mt-3 border-[var(--secondary)] color2 hbg2 hover:text-white! cursor-pointer text-gray-800 text-sm px-4 py-2 h-8"
        >
          Configure 2FA
        </Button>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* Active Sessions */}
        <p className="text-sm font-semibold text-gray-800 mb-3">
          Active Sessions
        </p>
        <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between bg-[#ECECF0]">
          <div>
            <p className="text-sm font-medium text-gray-800">Current Session</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Seattle, WA • Chrome on Windows
            </p>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>

        <Button
          variant="outline"
          className="mt-3 border-[var(--secondary)] color2 hbg2 hover:text-white! cursor-pointer text-gray-800 text-sm px-4 py-2 h-8"
        >
          View All Sessions
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Settings Page
───────────────────────────────────────── */
const TABS = [
  { id: "general", label: "General" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <div className="border border-gray-300 p-4 rounded-2xl">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Configure your marketplace settings and preferences
        </p>
      </div>

      {/* Tab Bar */}
      <span className="flex w-fit rounded-full gap-1  mb-5 bg-[#ECECF0] border border-[#ECECF0] overflow-hidden   ">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-t-md transition-colors rounded-full cursor-pointer",
              activeTab === tab.id
                ? "text-gray-900 bg-white"
                : "text-gray-900 hover:bg-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </span>

      {/* Tab Content */}
      {activeTab === "general" && <GeneralTab />}
      {activeTab === "notifications" && <NotificationsTab />}
      {activeTab === "security" && <SecurityTab />}
    </div>
  );
}
