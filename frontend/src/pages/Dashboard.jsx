import { useEffect, useRef, useState } from "react";
import publicAPI from "../api/publicAPI";
import { Database, TriangleAlert, CircleCheckBig, CircleX } from "lucide-react";
import Loader from "@/components/Loader/Loader";
function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [stats, setStats] = useState({
    totalLogs: 0,
    highSeverity: 0,
    resolved: 0,
    unresolved: 0,
  });
  const fetchLogs = async () => {
    try {
      setLoading(true);

      const res = await publicAPI.get("/logs", {
        params: {
          page,
          limit: 10,
          search,
          severity,
          status,
          sortField: "timestamp",
          sortOrder,
        },
      });

      setLogs(res.data.logs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    try {
      const res = await publicAPI.get("/dashboard-stats");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [page, search, severity, status, sortOrder]);
  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }

      const fileContent = await selectedFile.text();

      const logs = JSON.parse(fileContent);

      const res = await publicAPI.post("/upload", logs);

      alert(`Uploaded ${res.data.insertedCount} logs`);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchLogs();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };
  const handleClearFilters = () => {
    setSearch("");
    setSeverity("");
    setStatus("");
    setSortOrder("desc");
    setPage(1);
  };

  const handleDownloadSample = () => {
    const link = document.createElement("a");
    link.href = "/sample-file.json";
    link.download = "sample-file.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Audit Logs Dashboard</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="stats-container app_bg">
            <div className="stat-card">
              <div className="stat-icon total">
                <Database size={30} strokeWidth={1.8} />
              </div>
              <div>
                <small>Total Logs</small>
                <h6>{stats.totalLogs}</h6>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon high-risk">
                <TriangleAlert size={30} strokeWidth={1.8} />
              </div>
              <div>
                <small>High Risk</small>
                <h6>{stats.highSeverity}</h6>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon resolved">
                <CircleCheckBig size={30} strokeWidth={1.8} />
              </div>
              <div>
                <small>Resolved</small>
                <h6>{stats.resolved}</h6>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon unresolved">
                <CircleX size={30} strokeWidth={1.8} />
              </div>
              <div>
                <small>Unresolved</small>
                <h6>{stats.unresolved}</h6>
              </div>
            </div>
          </div>
          <div className="upload-section">
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
              ref={fileInputRef}
            />

            <button className="upload-btn" onClick={handleUpload}>
              Upload Logs
            </button>

            <button className="sample-btn" onClick={handleDownloadSample}>
              Download Sample File
            </button>
          </div>
          <div className="filter-section">
            <input
              className="search-input"
              type="text"
              placeholder="Search Actor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <select
              className="filter-select"
              value={severity}
              onChange={(e) => {
                setSeverity(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Severity</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            <select
              className="filter-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="Resolved">Resolved</option>
              <option value="Unresolved">Unresolved</option>
            </select>
            <select
              className="filter-select"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
              }}
            >
              <option value="desc">Latest First</option>
              <option value="asc">Oldest First</option>
            </select>
            <button className="clear-filter-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>

          {loading ? (
            <div className="loading-text">Loading logs...</div>
          ) : (
            <div className="table-wrapper">
              {" "}
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Actor</th>
                    <th>Role</th>
                    <th>Action</th>
                    <th>Resource</th>
                    <th>Resource Type</th>
                    <th>IP Address</th>
                    <th>Region</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>

                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log._id}>
                        <td>{log.actor}</td>
                        <td>{log.role}</td>
                        <td>{log.action}</td>
                        <td>{log.resource}</td>
                        <td>{log.resourceType}</td>
                        <td>{log.ipAddress}</td>
                        <td>{log.region}</td>

                        <td>
                          <span className={log.severity === "HIGH" ? "severity-badge high" : log.severity === "MEDIUM" ? "severity-badge medium" : "severity-badge low"}>{log.severity}</span>
                        </td>

                        <td>{log.status}</td>

                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="no-results">
                        No logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            <button className="page-nav" disabled={page === 1} onClick={() => setPage(page - 1)}>
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((pageNum) => pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1))
              .map((pageNum, index, arr) => (
                <div key={pageNum}>
                  {index > 0 && arr[index - 1] !== pageNum - 1 && <span className="ellipsis">...</span>}

                  <button className={`page-number ${page === pageNum ? "active" : ""}`} onClick={() => setPage(pageNum)}>
                    {pageNum}
                  </button>
                </div>
              ))}

            <button className="page-nav" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
