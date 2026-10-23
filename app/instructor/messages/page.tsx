"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ArrowLeft,
  Check,
  CheckCheck,
  ChevronDown,
  Inbox,
  Mail,
  MailOpen,
  MoreHorizontal,
  Paperclip,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type MessageStatus = "unread" | "read" | "archived";
type TabType = "all" | "unread" | "starred" | "archived";

type MessageItem = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: MessageStatus;
  starred: boolean;
};

const initialMessages: MessageItem[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subject: "Question about your web development service",
    message:
      "Hello, I am interested in your web development services. I would like to know more about your packages, estimated delivery time, and whether you provide ongoing support after the website is launched. Please let me know how we can proceed.",
    date: "Today, 10:42 AM",
    status: "unread",
    starred: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    subject: "Request for a project quotation",
    message:
      "Hi, I need a quotation for a small business website with around five pages, a contact form, and a basic admin dashboard. Could you share an estimated budget and timeline? Thank you.",
    date: "Yesterday",
    status: "unread",
    starred: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    subject: "Course enrollment inquiry",
    message:
      "Hello! I found your website while looking for programming courses. Are your courses suitable for beginners, and do you provide a certificate after completion?",
    date: "Yesterday",
    status: "read",
    starred: false,
  },
  {
    id: 4,
    name: "David Sharma",
    email: "david.sharma@example.com",
    subject: "Partnership opportunity",
    message:
      "I represent a small technology company and would like to discuss a potential partnership. Please let me know if you are available for a short meeting next week.",
    date: "Oct 16",
    status: "read",
    starred: true,
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    subject: "Feedback about your website",
    message:
      "I wanted to share some feedback about your website. The information was helpful, and I would love to learn more about your portfolio and previous projects.",
    date: "Oct 15",
    status: "archived",
    starred: false,
  },
];

const tabs: { id: TabType; label: string; icon: typeof Inbox }[] = [
  { id: "all", label: "Inbox", icon: Inbox },
  { id: "unread", label: "Unread", icon: MailOpen },
  { id: "starred", label: "Starred", icon: Star },
  { id: "archived", label: "Archive", icon: Archive },
];

const avatarColors = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [replyText, setReplyText] = useState("");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeMessage, setComposeMessage] = useState("");
  const [notice, setNotice] = useState("");

  const selectedMessage = messages.find((message) => message.id === selectedId);
  const unreadCount = messages.filter(
    (message) => message.status === "unread",
  ).length;
  const starredCount = messages.filter((message) => message.starred).length;

  const filteredMessages = useMemo(() => {
    const query = search.toLowerCase().trim();

    return messages.filter((message) => {
      const matchesSearch =
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query);

      const matchesTab =
        activeTab === "all"
          ? message.status !== "archived"
          : activeTab === "unread"
            ? message.status === "unread"
            : activeTab === "starred"
              ? message.starred && message.status !== "archived"
              : message.status === "archived";

      return matchesSearch && matchesTab;
    });
  }, [messages, search, activeTab]);

  function openMessage(message: MessageItem) {
    setSelectedId(message.id);
    setMobileDetailOpen(true);
    if (message.status === "unread") {
      setMessages((current) =>
        current.map((item) =>
          item.id === message.id ? { ...item, status: "read" } : item,
        ),
      );
    }
  }

  function updateStatus(id: number, status: MessageStatus) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, status } : message,
      ),
    );
  }

  function toggleStar(id: number) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, starred: !message.starred } : message,
      ),
    );
  }

  function deleteMessage(id: number) {
    setMessages((current) => current.filter((message) => message.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setMobileDetailOpen(false);
    }
    setNotice("Message deleted");
    window.setTimeout(() => setNotice(""), 2400);
  }

  function markAllAsRead() {
    setMessages((current) =>
      current.map((message) =>
        message.status === "unread" ? { ...message, status: "read" } : message,
      ),
    );
    setNotice("Inbox marked as read");
    window.setTimeout(() => setNotice(""), 2400);
  }

  function sendReply() {
    if (!selectedMessage || !replyText.trim()) return;

    console.log("Reply prepared:", {
      to: selectedMessage.email,
      subject: `Re: ${selectedMessage.subject}`,
      message: replyText.trim(),
    });

    setNotice("Reply drafted. Connect your email API to send it.");
    setReplyText("");
    window.setTimeout(() => setNotice(""), 3500);
  }

  function prepareCompose() {
    if (!composeTo.trim() || !composeSubject.trim() || !composeMessage.trim()) {
      setNotice("Complete all fields to prepare your message");
      window.setTimeout(() => setNotice(""), 2400);
      return;
    }

    console.log("Compose prepared:", {
      to: composeTo.trim(),
      subject: composeSubject.trim(),
      message: composeMessage.trim(),
    });
    setShowCompose(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeMessage("");
    setNotice("Message drafted. Connect your email API to send it.");
    window.setTimeout(() => setNotice(""), 3500);
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-3 py-5 text-slate-800 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Workspace</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Communication</span>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-600">Messages</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[34px]">
                Messages
              </h1>
              <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                {unreadCount} unread
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Stay on top of inquiries, follow up with leads, and keep every
              conversation organized.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCompose(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            <Mail size={17} />
            Compose message
          </button>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total messages
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {messages.length}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Across all folders
                </p>
              </div>
              <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Inbox size={21} />
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Needs attention
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {unreadCount}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Unread conversations
                </p>
              </div>
              <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <MailOpen size={21} />
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Important</p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {starredCount}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Starred conversations
                </p>
              </div>
              <span className="rounded-xl bg-rose-50 p-3 text-rose-500">
                <Star size={21} />
              </span>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Your inbox</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredMessages.length}{" "}
                {filteredMessages.length === 1
                  ? "conversation"
                  : "conversations"}{" "}
                found
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="relative block sm:w-72">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                  aria-label="Search conversations"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </label>
              <button
                type="button"
                onClick={markAllAsRead}
                title="Mark all messages as read"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <CheckCheck size={16} />
                <span>Mark all read</span>
              </button>
            </div>
          </div>

          <div className="grid min-h-[650px] grid-cols-1 lg:grid-cols-[220px_minmax(300px,360px)_minmax(0,1fr)]">
            <aside
              className={`${mobileDetailOpen ? "hidden" : "block"} border-b border-slate-100 bg-slate-50/70 p-3 lg:block lg:border-b-0 lg:border-r`}
            >
              <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Mailbox
              </p>
              <nav className="space-y-1" aria-label="Message folders">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const count =
                    tab.id === "all"
                      ? messages.filter(
                          (message) => message.status !== "archived",
                        ).length
                      : tab.id === "unread"
                        ? unreadCount
                        : tab.id === "starred"
                          ? messages.filter(
                              (message) =>
                                message.starred &&
                                message.status !== "archived",
                            ).length
                          : messages.filter(
                              (message) => message.status === "archived",
                            ).length;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileDetailOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                        activeTab === tab.id
                          ? "bg-indigo-600 font-semibold text-white shadow-md shadow-indigo-600/15"
                          : "font-medium text-slate-600 hover:bg-white hover:text-slate-950"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} />
                        {tab.label}
                      </span>
                      <span
                        className={`min-w-6 rounded-md px-1.5 py-0.5 text-center text-xs ${
                          activeTab === tab.id
                            ? "bg-white/15 text-white"
                            : "text-slate-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 rounded-xl border border-indigo-100 bg-white p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Check size={18} />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-800">
                  Inbox zero starts here
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Review new inquiries and mark conversations as read when you
                  are done.
                </p>
              </div>
            </aside>

            <section
              className={`${mobileDetailOpen ? "hidden" : "block"} min-w-0 border-b border-slate-100 lg:block lg:border-b-0 lg:border-r`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Select a conversation to read
                  </p>
                </div>
                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                >
                  <CheckCheck size={17} />
                </button>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                  <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
                    <Inbox size={24} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-800">
                    Nothing here yet
                  </p>
                  <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-500">
                    Try another folder or search for a different conversation.
                  </p>
                </div>
              ) : (
                <div>
                  {filteredMessages.map((message, index) => (
                    <article
                      key={message.id}
                      className={`group border-b border-slate-100 transition ${
                        selectedId === message.id
                          ? "bg-indigo-50/70"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => openMessage(message)}
                        className="w-full px-4 pb-2 pt-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${avatarColors[index % avatarColors.length]}`}
                          >
                            {initials(message.name)}
                            {message.status === "unread" && (
                              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-indigo-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p
                                className={`truncate text-[13px] ${message.status === "unread" ? "font-bold text-slate-950" : "font-semibold text-slate-700"}`}
                              >
                                {message.name}
                              </p>
                              <span className="shrink-0 text-[10px] text-slate-400">
                                {message.date.replace("Today, ", "")}
                              </span>
                            </div>
                            <p
                              className={`mt-1 truncate text-xs ${message.status === "unread" ? "font-bold text-slate-800" : "font-medium text-slate-600"}`}
                            >
                              {message.subject}
                            </p>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      </button>
                      <div className="flex items-center justify-between px-4 pb-3 pl-[68px]">
                        <button
                          type="button"
                          onClick={() => toggleStar(message.id)}
                          aria-label={
                            message.starred ? "Remove star" : "Star message"
                          }
                          className={`rounded-md p-1 transition ${message.starred ? "text-amber-500" : "text-slate-300 hover:text-amber-500"}`}
                        >
                          <Star
                            size={14}
                            fill={message.starred ? "currentColor" : "none"}
                          />
                        </button>
                        <div className="flex items-center gap-0.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                          <button
                            type="button"
                            title={
                              message.status === "unread"
                                ? "Mark as read"
                                : "Mark as unread"
                            }
                            onClick={() =>
                              updateStatus(
                                message.id,
                                message.status === "unread" ? "read" : "unread",
                              )
                            }
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-indigo-600"
                          >
                            {message.status === "unread" ? (
                              <MailOpen size={14} />
                            ) : (
                              <Mail size={14} />
                            )}
                          </button>
                          <button
                            type="button"
                            title={
                              message.status === "archived"
                                ? "Restore to inbox"
                                : "Archive message"
                            }
                            onClick={() =>
                              updateStatus(
                                message.id,
                                message.status === "archived"
                                  ? "read"
                                  : "archived",
                              )
                            }
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-indigo-600"
                          >
                            <Archive size={14} />
                          </button>
                          <button
                            type="button"
                            title="Delete message"
                            onClick={() => deleteMessage(message.id)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-rose-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section
              className={`${mobileDetailOpen ? "block" : "hidden"} min-w-0 bg-white lg:block`}
            >
              {selectedMessage ? (
                <div className="flex h-full min-h-[650px] flex-col">
                  <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3.5 sm:px-6">
                    <button
                      type="button"
                      onClick={() => setMobileDetailOpen(false)}
                      className="mr-1 rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                      aria-label="Back to messages"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <span className="text-sm font-semibold text-slate-700">
                      Conversation
                    </span>
                    <div className="ml-auto flex items-center gap-1">
                      <button
                        type="button"
                        title={
                          selectedMessage.starred
                            ? "Remove star"
                            : "Star message"
                        }
                        onClick={() => toggleStar(selectedMessage.id)}
                        className={`rounded-lg p-2 transition hover:bg-slate-100 ${selectedMessage.starred ? "text-amber-500" : "text-slate-400 hover:text-amber-500"}`}
                      >
                        <Star
                          size={17}
                          fill={
                            selectedMessage.starred ? "currentColor" : "none"
                          }
                        />
                      </button>
                      <button
                        type="button"
                        title={
                          selectedMessage.status === "unread"
                            ? "Mark as read"
                            : "Mark as unread"
                        }
                        onClick={() =>
                          updateStatus(
                            selectedMessage.id,
                            selectedMessage.status === "unread"
                              ? "read"
                              : "unread",
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                      >
                        {selectedMessage.status === "unread" ? (
                          <MailOpen size={17} />
                        ) : (
                          <Mail size={17} />
                        )}
                      </button>
                      <button
                        type="button"
                        title={
                          selectedMessage.status === "archived"
                            ? "Restore to inbox"
                            : "Archive message"
                        }
                        onClick={() =>
                          updateStatus(
                            selectedMessage.id,
                            selectedMessage.status === "archived"
                              ? "read"
                              : "archived",
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                      >
                        <Archive size={17} />
                      </button>
                      <button
                        type="button"
                        title="Delete message"
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={17} />
                      </button>
                      <button
                        type="button"
                        title="More options"
                        onClick={() =>
                          setNotice("More actions can be connected here.")
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                          Message subject
                        </p>
                        <h2 className="max-w-3xl text-xl font-bold leading-8 tracking-tight text-slate-950 sm:text-2xl">
                          {selectedMessage.subject}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">
                          Received {selectedMessage.date}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize ${
                          selectedMessage.status === "unread"
                            ? "bg-indigo-50 text-indigo-700"
                            : selectedMessage.status === "archived"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {selectedMessage.status}
                      </span>
                    </div>

                    <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${avatarColors[selectedMessage.id % avatarColors.length]}`}
                        >
                          {initials(selectedMessage.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900">
                            {selectedMessage.name}
                          </p>
                          <p className="mt-0.5 break-all text-xs text-slate-500">
                            {selectedMessage.email}
                          </p>
                          <p className="mt-2 text-[11px] text-slate-400">
                            To: your inbox
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(
                              selectedMessage.email,
                            );
                            setNotice("Email address copied");
                            window.setTimeout(() => setNotice(""), 2400);
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600"
                        >
                          Copy email
                        </button>
                      </div>
                    </div>

                    <div className="py-7">
                      <p className="whitespace-pre-line text-sm leading-8 text-slate-600">
                        {selectedMessage.message}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Contact details
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-100 p-3.5">
                          <p className="text-xs text-slate-400">Full name</p>
                          <p className="mt-1.5 text-sm font-semibold text-slate-800">
                            {selectedMessage.name}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-100 p-3.5">
                          <p className="text-xs text-slate-400">
                            Email address
                          </p>
                          <p className="mt-1.5 break-all text-sm font-semibold text-slate-800">
                            {selectedMessage.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-6">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <Reply size={17} className="text-indigo-600" />
                        Reply to {selectedMessage.name.split(" ")[0]}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Email response
                      </span>
                    </div>
                    <textarea
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                      placeholder={`Write your reply to ${selectedMessage.name}...`}
                      rows={4}
                      className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-5 text-slate-400">
                        Sending is disabled until an email service is connected.
                      </p>
                      <button
                        type="button"
                        onClick={sendReply}
                        disabled={!replyText.trim()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Send size={15} />
                        Prepare reply
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[650px] flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                    <Mail size={28} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    Choose a conversation
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Select a message from your inbox to read the details and
                    prepare a reply.
                  </p>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-xl shadow-slate-900/10"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={15} />
          </span>
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="ml-2 rounded-md p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="compose-title"
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="compose-title"
                  className="text-lg font-bold text-slate-950"
                >
                  Compose message
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Create a new email draft
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                aria-label="Close compose dialog"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <label
                  htmlFor="compose-to"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  Recipient
                </label>
                <input
                  id="compose-to"
                  type="email"
                  value={composeTo}
                  onChange={(event) => setComposeTo(event.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
              <div>
                <label
                  htmlFor="compose-subject"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  Subject
                </label>
                <input
                  id="compose-subject"
                  value={composeSubject}
                  onChange={(event) => setComposeSubject(event.target.value)}
                  placeholder="What is this message about?"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
              <div>
                <label
                  htmlFor="compose-message"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  Message
                </label>
                <textarea
                  id="compose-message"
                  value={composeMessage}
                  onChange={(event) => setComposeMessage(event.target.value)}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={prepareCompose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <Paperclip size={15} /> Prepare draft
                </button>
              </div>
              <p className="text-xs leading-5 text-slate-400">
                This form prepares a draft only. Connect your Laravel mail
                endpoint to send messages.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
