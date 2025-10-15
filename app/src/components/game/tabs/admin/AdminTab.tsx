import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleInfo,
  faTriangleExclamation,
  faCircleExclamation,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

type LogLevel = "log" | "info" | "warn" | "error";

interface ConsoleLog {
  id: number;
  level: LogLevel;
  message: string;
  timestamp: Date;
  args: unknown[];
}

export default function AdminTab() {
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [filter, setFilter] = useState<LogLevel | "all">("all");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(0);

  useEffect(() => {
    // Store original console methods
    const originalLog = console.log;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Helper function to add log
    const addLog = (level: LogLevel, args: unknown[]) => {
      const message = args
        .map((arg) => {
          if (typeof arg === "object") {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(" ");

      setLogs((prevLogs) => [
        ...prevLogs,
        {
          id: logIdCounter.current++,
          level,
          message,
          timestamp: new Date(),
          args,
        },
      ]);
    };

    // Override console methods
    console.log = (...args: unknown[]) => {
      originalLog(...args);
      addLog("log", args);
    };

    console.info = (...args: unknown[]) => {
      originalInfo(...args);
      addLog("info", args);
    };

    console.warn = (...args: unknown[]) => {
      originalWarn(...args);
      addLog("warn", args);
    };

    console.error = (...args: unknown[]) => {
      originalError(...args);
      addLog("error", args);
    };

    // Cleanup: restore original console methods
    return () => {
      console.log = originalLog;
      console.info = originalInfo;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const clearLogs = () => {
    setLogs([]);
  };

  const getLogIcon = (level: LogLevel) => {
    switch (level) {
      case "info":
        return (
          <FontAwesomeIcon icon={faCircleInfo} className="text-blue-400" />
        );
      case "warn":
        return (
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-yellow-400"
          />
        );
      case "error":
        return (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-400"
          />
        );
      default:
        return <FontAwesomeIcon icon={faCode} className="text-gray-400" />;
    }
  };

  const getLogColor = (level: LogLevel) => {
    switch (level) {
      case "info":
        return "text-blue-300";
      case "warn":
        return "text-yellow-300";
      case "error":
        return "text-red-300";
      default:
        return "text-[var(--text-color)]";
    }
  };

  const filteredLogs = logs.filter(
    (log) => filter === "all" || log.level === filter
  );

  return (
    <div className="h-full flex flex-col font-['MT'] bg-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-[#252525] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCode} className="text-[var(--text-color)]" />
          <h2 className="text-sm font-semibold text-[var(--text-color)]">
            Console
          </h2>
          <span className="text-xs text-gray-400">({filteredLogs.length})</span>
        </div>
        <button
          onClick={clearLogs}
          className="px-3 py-1 text-xs rounded bg-[#333333] hover:bg-[#404040] text-[var(--text-color)] transition-colors flex items-center gap-2"
          title="Clear console"
        >
          <FontAwesomeIcon icon={faTrash} />
          Clear
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 p-2 bg-[#1f1f1f] border-b border-gray-700">
        {(["all", "log", "info", "warn", "error"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              filter === level
                ? "bg-[var(--secondary-color)] text-white"
                : "bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Logs container */}
      <div className="flex-1 overflow-y-auto chat-scrollbar p-2 space-y-1">
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-8">
            No console logs to display
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex gap-2 p-2 rounded hover:bg-[#252525] transition-colors group"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getLogIcon(log.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-500">
                    {log.timestamp.toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      fractionalSecondDigits: 3,
                    })}
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase ${getLogColor(log.level)}`}
                  >
                    {log.level}
                  </span>
                </div>
                <pre className="text-xs text-[var(--text-color)] mt-1 whitespace-pre-wrap break-words font-mono">
                  {log.message}
                </pre>
              </div>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
