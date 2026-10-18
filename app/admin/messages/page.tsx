"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ArrowLeft,
  CheckCheck,
  Inbox,
  Mail,
  MailOpen,
  MoreHorizontal,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
  UserRound,
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
    date: "10:42 AM",
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

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [replyText, setReplyText] = useState("");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const selectedMessage = messages.find(
    (message) => message.id === selectedId
  );

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  const starredCount = messages.filter(
    (message) => message.starred
  ).length;

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
          item.id === message.id
            ? { ...item, status: "read" }
            : item
        )
      );
    }
  }

  function updateStatus(id: number, status: MessageStatus) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, status } : message
      )
    );
  }

  function toggleStar(id: number) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id
          ? { ...message, starred: !message.starred }
          : message
      )
    );
  }

  function deleteMessage(id: number) {
    setMessages((current) =>
      current.filter((message) => message.id !== id)
    );

    if (selectedId === id) {
      setSelectedId(null);
      setMobileDetailOpen(false);
    }
  }

  function markAllAsRead() {
    setMessages((current) =>
      current.map((message) =>
        message.status === "unread"
          ? { ...message, status: "read" }
          : message
      )
    );
  }

  function sendReply() {
    if (!selectedMessage || !replyText.trim()) return;

    console.log("Reply:", {
      to: selectedMessage.email,
      subject: `Re: ${selectedMessage.subject}`,
      message: replyText.trim(),
    });

    alert(
      "Reply prepared. Connect your Laravel API or email service to send it."
    );

    setReplyText("");
  }

  const tabs = [
    {
      id: "all" as const,
      label: "All messages",
      icon: Inbox,
      count: messages.filter(
        (message) => message.status !== "archived"
      ).length,
    },
    {
      id: "unread" as const,
      label: "Unread",
      icon: Mail,
      count: unreadCount,
    },
    {
      id: "starred" as const,
      label: "Starred",
      icon: Star,
      count: messages.filter(
        (message) =>
          message.starred && message.status !== "archived"
      ).length,
    },
    {
      id: "archived" as const,
      label: "Archived",
      icon: Archive,
      count: messages.filter(
        (message) => message.status === "archived"
      ).length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-700">Messages</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Messages
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage inquiries and conversations from your visitors.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              alert("Connect a compose form and email backend here.")
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Mail size={17} />
            Compose message
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total messages
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {messages.length}
                </p>
              </div>

              <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                <Inbox size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Unread messages
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {unreadCount}
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <MailOpen size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Starred messages
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {starredCount}
                </p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
                <Star size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Inbox */}
        <div className="grid min-h-[650px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside
            className={`border-b border-slate-200 bg-white lg:border-b-0 lg:border-r ${
              mobileDetailOpen ? "hidden lg:block" : "block"
            }`}
          >
            <div className="border-b border-slate-200 p-4">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="space-y-1 p-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                      activeTab === tab.id
                        ? "bg-indigo-50 font-semibold text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {tab.label}
                    </span>

                    <span
                      className={`rounded-md px-2 py-0.5 text-xs ${
                        activeTab === tab.id
                          ? "bg-white text-indigo-700"
                          : "text-slate-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mx-4 border-t border-slate-100 pt-4">
              <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Inbox tips
              </p>
              <p className="mt-2 px-2 text-xs leading-5 text-slate-500">
                Select a message to view its details. Use the star to mark
                important conversations.
              </p>
            </div>
          </aside>

          {/* Message list */}
          <section
            className={`min-w-0 border-b border-slate-200 lg:border-b-0 lg:border-r ${
              mobileDetailOpen ? "hidden lg:block" : "block"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div>
                <h2 className="font-semibold text-slate-900">
                  {activeTab === "all"
                    ? "Inbox"
                    : activeTab === "unread"
                    ? "Unread messages"
                    : activeTab === "starred"
                    ? "Starred messages"
                    : "Archived messages"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredMessages.length} messages
                </p>
              </div>

              <button
                type="button"
                title="Mark all as read"
                onClick={markAllAsRead}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
              >
                <CheckCheck size={18} />
              </button>
            </div>

            <div>
              {filteredMessages.length === 0 ? (
                <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
                  <div className="rounded-full bg-slate-100 p-4 text-slate-400">
                    <Inbox size={25} />
                  </div>

                  <p className="mt-4 font-semibold text-slate-800">
                    No messages found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or selected folder.
                  </p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`group border-b border-slate-100 transition hover:bg-slate-50 ${
                      selectedId === message.id
                        ? "bg-indigo-50/60"
                        : "bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => openMessage(message)}
                      className="w-full px-4 py-4 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                          {message.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}

                          {message.status === "unread" && (
                            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-600" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={`truncate text-sm ${
                                message.status === "unread"
                                  ? "font-bold text-slate-900"
                                  : "font-medium text-slate-700"
                              }`}
                            >
                              {message.name}
                            </p>

                            <span className="shrink-0 text-[11px] text-slate-400">
                              {message.date}
                            </span>
                          </div>

                          <p
                            className={`mt-1 truncate text-sm ${
                              message.status === "unread"
                                ? "font-semibold text-slate-800"
                                : "text-slate-600"
                            }`}
                          >
                            {message.subject}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
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
                          message.starred
                            ? "Remove star"
                            : "Star message"
                        }
                        className={`transition ${
                          message.starred
                            ? "text-amber-500"
                            : "text-slate-300 hover:text-amber-500"
                        }`}
                      >
                        <Star
                          size={15}
                          fill={message.starred ? "currentColor" : "none"}
                        />
                      </button>

                      <div className="flex items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
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
                              message.status === "unread"
                                ? "read"
                                : "unread"
                            )
                          }
                          className="rounded-md p-1.5 text-slate-400 hover:bg-white hover:text-indigo-600"
                        >
                          {message.status === "unread" ? (
                            <MailOpen size={15} />
                          ) : (
                            <Mail size={15} />
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
                                : "archived"
                            )
                          }
                          className="rounded-md p-1.5 text-slate-400 hover:bg-white hover:text-indigo-600"
                        >
                          <Archive size={15} />
                        </button>

                        <button
                          type="button"
                          title="Delete message"
                          onClick={() => deleteMessage(message.id)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-white hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Message details */}
          <section
            className={`min-w-0 bg-white ${
              mobileDetailOpen ? "block" : "hidden lg:block"
            }`}
          >
            {selectedMessage ? (
              <div className="flex h-full min-h-[650px] flex-col">
                {/* Detail toolbar */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setMobileDetailOpen(false)}
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 lg:hidden"
                  >
                    <ArrowLeft size={17} />
                    Back
                  </button>

                  <span className="hidden text-sm font-medium text-slate-500 lg:block">
                    Message details
                  </span>

                  <div className="ml-auto flex items-center gap-1">
                    <button
                      type="button"
                      title="Toggle star"
                      onClick={() => toggleStar(selectedMessage.id)}
                      className={`rounded-lg p-2 transition hover:bg-slate-100 ${
                        selectedMessage.starred
                          ? "text-amber-500"
                          : "text-slate-400"
                      }`}
                    >
                      <Star
                        size={18}
                        fill={
                          selectedMessage.starred
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <button
                      type="button"
                      title="Toggle read status"
                      onClick={() =>
                        updateStatus(
                          selectedMessage.id,
                          selectedMessage.status === "unread"
                            ? "read"
                            : "unread"
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                    >
                      {selectedMessage.status === "unread" ? (
                        <MailOpen size={18} />
                      ) : (
                        <Mail size={18} />
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
                            : "archived"
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                    >
                      <Archive size={18} />
                    </button>

                    <button
                      type="button"
                      title="Delete message"
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Message content */}
                <div className="flex-1 p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold leading-7 text-slate-900">
                        {selectedMessage.subject}
                      </h2>

                      <p className="mt-2 text-xs text-slate-500">
                        Received {selectedMessage.date}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        selectedMessage.status === "unread"
                          ? "bg-indigo-50 text-indigo-700"
                          : selectedMessage.status === "archived"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {selectedMessage.status.charAt(0).toUpperCase() +
                        selectedMessage.status.slice(1)}
                    </span>
                  </div>

                  <div className="mt-7 flex items-start gap-3 border-b border-slate-100 pb-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                      {selectedMessage.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">
                        {selectedMessage.name}
                      </p>

                      <p className="mt-0.5 break-all text-sm text-slate-500">
                        {selectedMessage.email}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        To: your inbox
                      </p>
                    </div>

                    <button
                      type="button"
                      title="More actions"
                      onClick={() =>
                        alert("More message actions can be added here.")
                      }
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <div className="py-6">
                    <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <UserRound size={17} className="text-slate-500" />
                      Sender information
                    </div>

                    <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-slate-400">Full name</p>
                        <p className="mt-1 font-medium text-slate-700">
                          {selectedMessage.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Email address
                        </p>
                        <p className="mt-1 break-all font-medium text-slate-700">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply box */}
                <div className="border-t border-slate-200 p-4 sm:p-6">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Reply size={17} className="text-indigo-600" />
                    Reply to {selectedMessage.name.split(" ")[0]}
                  </div>

                  <textarea
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    placeholder={`Write a reply to ${selectedMessage.email}...`}
                    rows={4}
                    className="w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-slate-400">
                      Replies require an email backend.
                    </p>

                    <button
                      type="button"
                      onClick={sendReply}
                      disabled={!replyText.trim()}
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={16} />
                      Send reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[650px] flex-col items-center justify-center px-6 text-center">
                <div className="rounded-full bg-indigo-50 p-5 text-indigo-500">
                  <Mail size={30} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Select a message
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Choose a conversation from your inbox to read its details
                  and reply.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}