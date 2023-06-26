import { TMenuItem } from ".";

export const items: TMenuItem[] = [
  { id: 1, group: 1, text: "View profile", icon: "", hotkey: "⌘K->P" },
  { id: 2, group: 1, text: "Settings", icon: "", hotkey: "⌘S" },
  { id: 3, group: 1, text: "Keyboard shortcuts", icon: "", hotkey: "?" },
  { id: 4, group: 2, text: "Company profile", icon: "", hotkey: "⌘K->C" },
  { id: 5, group: 2, text: "Team", icon: "", hotkey: "⌘K->T" },
  { id: 6, group: 2, text: "Invite colleagues", icon: "", hotkey: "⌘I" },
  { id: 7, group: 3, text: "Changelog", icon: "", hotkey: "⌘K->C" },
  { id: 8, group: 3, text: "Slack Community", icon: "", hotkey: "⌘K->S" },
  { id: 9, group: 3, text: "Support", icon: "", hotkey: "⌘/" },
  { id: 10, group: 3, text: "API", icon: "", hotkey: "⌘A" },
  { id: 11, group: null, text: "Logout", icon: "", hotkey: "⌥⇧Q" },
];
