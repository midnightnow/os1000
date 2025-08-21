import TerminalPlayer from './components/TerminalPlayer'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <a 
            href="https://lunadarkside.com" 
            className="back-to-portal"
            target="_blank"
            rel="noopener noreferrer"
          >
            ← Back to Portal
          </a>
        </div>
        <h1 className="title glitch">OS1000</h1>
        <p className="tagline">Operating System as Performance Art</p>
        <div className="version-info">v1.1.0 - Build 20250821</div>
      </header>

      <main className="main">
        <section className="terminal-section">
          <TerminalPlayer />
          <div className="terminal-footer">
            <div className="nuto-info">
              <p>Based on NUTO's "Operating System in 1000 Lines"</p>
              <div className="nuto-footer-buttons">
                <a 
                  href="https://operating-system-in-1000-lines.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-nuto"
                >
                  READ BOOK
                </a>
                <a 
                  href="https://github.com/nuta/operating-system-in-1000-lines" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-nuto"
                >
                  NUTO SOURCE
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="video-container">
            <div className="video-placeholder">
              <h3>🎵 OS1000 SHOWCASE REEL</h3>
              <p>[INITIALIZING STREAM...]</p>
              <a 
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
              >
                LAUNCH MUSIC VIDEO 00 - Getting Started
              </a>
              <div className="luna-buttons">
                <a 
                  href="https://github.com/midnightnow/os1000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-luna"
                >
                  OS1000 SOURCE
                </a>
                <a 
                  href="https://www.youtube.com/playlist?list=OLAK5uy_nwxlvSsjdmPqt5fMzvyTP-UnQ2zoscbCk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-luna"
                >
                  OS1000 YOUTUBE
                </a>
              </div>
            </div>
          </div>

          <div className="quick-commands">
            <h3>Quick Commands:</h3>
            <ul>
              <li><code>help</code> - Show available commands</li>
              <li><code>list</code> - List all tracks</li>
              <li><code>play &lt;id&gt;</code> - Play a track</li>
              <li><code>status</code> - System status</li>
              <li><code>panic</code> - Trigger kernel panic</li>
              <li><code>syscall &lt;id&gt;</code> - Trace system call</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 OS1000 DYNAMICS. SYSTEM STATUS: <span className="status-ok">NOMINAL</span></p>
      </footer>
    </div>
  )
}

export default App