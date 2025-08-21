import React, { useEffect, useRef, useState } from 'react'
import './TerminalPlayer.css'

type Track = {
  id: string
  title: string
  length: string
  date: string
  status: string
  videoUrl?: string
  thumbnail?: string
}

const TerminalPlayer: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    '════════════════════════════════════════',
    '     OS1000 Interactive Console v1.0.1',
    '     © 2025 Luna Darkside Productions',
    '════════════════════════════════════════',
    '',
    'Welcome to the operating system as performance art.',
    'Type `help` for available commands or `boot` to initialize.',
    ''
  ])
  const [input, setInput] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [, setKernelState] = useState<'booting' | 'running' | 'panic'>('running')
  const [activeVideo, setActiveVideo] = useState<null | { url: string; id: string; title: string }>(null)
  const [audioContextInitialized, setAudioContextInitialized] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const historyEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Use hardcoded tracks for now until backend is deployed
    const hardcodedTracks: Track[] = [
      {id: 'intro-os-overture', title: 'Intro (The OS Overture)', length: '3:41', date: '2025-05-25', status: 'ONLINE', 
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/intro-os-overture.jpg'},
      {id: 'getting-started', title: 'Getting Started', length: '3:25', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/getting-started.jpg'},
      {id: 'risc-v-101', title: 'RISC-V 101', length: '3:10', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/risc-v-101.jpg'},
      {id: 'overview', title: 'Overview', length: '4:00', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/overview.jpg'},
      {id: 'boot', title: 'Boot', length: '4:00', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: '/thumbnails/boot.jpg'},
      {id: 'hello-world', title: 'Hello World!', length: '3:30', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/hello-world.jpg'},
      {id: 'c-standard-library', title: 'C Standard Library', length: '3:45', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/c-standard-library.jpg'},
      {id: 'kernel-panic', title: 'Kernel Panic', length: '4:12', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/kernel-panic.jpg'},
      {id: 'exception', title: 'Exception', length: '3:58', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/exception.jpg'},
      {id: 'memory-allocation', title: 'Memory Allocation', length: '4:15', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/memory-allocation.jpg'},
      {id: 'process', title: 'Process', length: '3:52', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/process.jpg'},
      {id: 'page-table', title: 'Page Table', length: '3:33', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/page-table.jpg'},
      {id: 'application', title: 'Application', length: '3:48', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/application.jpg'},
      {id: 'user-mode', title: 'User Mode', length: '3:29', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/user-mode.jpg'},
      {id: 'system-call', title: 'System Call', length: '3:44', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/system-call.jpg'},
      {id: 'disk-io', title: 'Disk I/O', length: '3:56', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/disk-io.jpg'},
      {id: 'file-system', title: 'File System', length: '4:05', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/file-system.jpg'},
      {id: 'outro-next-step', title: 'Outro (The Next Step)', length: '3:35', date: '2025-05-25', status: 'ONLINE',
       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/thumbnails/outro-next-step.jpg'}
    ]
    setTracks(hardcodedTracks)
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when history updates
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const println = (line: string, instant: boolean = false) => {
    if (instant) {
      setHistory(h => [...h, line])
    } else {
      // Add typing effect for better UX
      setHistory(h => [...h, line])
    }
  }
  
  const printBlock = (lines: string[]) => {
    lines.forEach(line => println(line))
  }

  const playTrack = async (id: string) => {
    const track = tracks.find(t => t.id === id)
    if (!track) {
      return { status: 'error', message: `Track not found: ${id}` }
    }

    // Trigger visual effect
    document.body.classList.add('os1000-playing')
    setTimeout(() => document.body.classList.remove('os1000-playing'), 2000)
    
    // If track has video, show video player (deprecated - use activeVideo state)
    if (track.videoUrl) {
      return { status: 'playing', message: `Video loaded: ${track.title}` }
    }
    
    // Try to play audio file (with graceful fallback)
    if (audioRef.current) {
      try {
        audioRef.current.src = `/audio/${id}.mp3`
        
        // Add error handling for missing audio files
        audioRef.current.onerror = () => {
          console.warn(`Audio file not found: /audio/${id}.mp3`)
          // Continue without audio - don't break the experience
        }
        
        audioRef.current.play().catch(() => {
          console.warn(`Could not play audio: ${id}.mp3`)
          // Continue without audio - don't break the experience
        })
      } catch (error) {
        console.warn(`Audio playback error for ${id}:`, error)
      }
    }
    
    return { status: 'playing', message: `Now playing: ${track.title}` }
  }

  // Removed closeVideo function - using activeVideo state instead

  // Initialize AudioContext on first user interaction
  const initializeAudioContext = async () => {
    if (!audioContextInitialized && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        
        setAudioContextInitialized(true)
        console.log('AudioContext initialized successfully')
      } catch (error) {
        console.warn('AudioContext initialization failed:', error)
      }
    }
  }

  const getSystemStatus = async () => {
    // Simulated system status
    return {
      cpu: {
        usage: Math.floor(Math.random() * 30 + 60),
        cores: 4,
        load: [2.14, 1.89, 1.76]
      },
      memory: {
        used_gb: 4.2,
        total_gb: 8.0
      },
      system: {
        processes: 42,
        uptime_hours: 13.37,
        kernel: 'OS1000 v1.0.0'
      }
    }
  }

  // OS learning curriculum mapping
  const OS_CURRICULUM = [
    { track: 'intro-os-overture', concept: 'System Initialization', code: 'void boot() { init_hardware(); load_kernel(); }' },
    { track: 'getting-started', concept: 'Development Environment', code: 'export PATH=/usr/bin:$PATH' },
    { track: 'risc-v-101', concept: 'CPU Architecture', code: 'addi sp, sp, -16  // Stack frame' },
    { track: 'overview', concept: 'System Design', code: 'struct kernel { void* memory; scheduler* sched; };' },
    { track: 'boot', concept: 'Boot Process', code: 'BIOS -> Bootloader -> Kernel -> Init' },
    { track: 'hello-world', concept: 'First Program', code: 'printf("Hello, World!\\n");' },
    { track: 'c-standard-library', concept: 'Core Libraries', code: '#include <stdlib.h>' },
    { track: 'kernel-panic', concept: 'Error Handling', code: 'panic("Attempted to kill init!");' },
    { track: 'exception', concept: 'Exception Management', code: 'trap_handler() { save_context(); handle(); }' },
    { track: 'memory-allocation', concept: 'Dynamic Memory', code: 'void* malloc(size_t size) { /* heap alloc */ }' },
    { track: 'process', concept: 'Process Management', code: 'fork() -> exec() -> wait()' },
    { track: 'page-table', concept: 'Virtual Memory', code: 'pte_t* walk(pagetable_t, uint64 va);' },
    { track: 'application', concept: 'User Programs', code: 'int main(int argc, char** argv)' },
    { track: 'user-mode', concept: 'Privilege Levels', code: 'Ring 0: Kernel | Ring 3: User' },
    { track: 'system-call', concept: 'Kernel Interface', code: 'syscall(SYS_write, fd, buf, count);' },
    { track: 'disk-io', concept: 'Storage Operations', code: 'read_block(device, block_num, buffer);' },
    { track: 'file-system', concept: 'File Management', code: 'struct inode { uint type; uint size; };' },
    { track: 'outro-next-step', concept: 'Future Expansion', code: '// Your OS journey continues...' }
  ]

  const commands: Record<string, (...args: string[]) => void | Promise<void>> = {
    help: () => {
      printBlock([
        '',
        '╔════════════════════════════════════════════════╗',
        '║            OS1000 COMMAND REFERENCE            ║',
        '╚════════════════════════════════════════════════╝',
        '',
        '📚 CORE COMMANDS',
        '  help                Show this help message',
        '  clear               Clear terminal screen',
        '  about               About OS1000 platform',
        '  status              System performance metrics',
        '',
        '🎵 AUDIO COMMANDS',
        '  list                Display track catalog',
        '  play <id>           Play track by ID',
        '  gallery             Browse video collection',
        '  video <id>          Launch video player',
        '',
        '🎓 LEARNING SYSTEM',
        '  learn <0-17>        Start chapter (0-17)',
        '  next                Advance to next chapter',
        '  curriculum          View complete syllabus',
        '  workbook            Interactive exercises',
        '',
        '💻 DEVELOPMENT TOOLS',
        '  code <chapter>      Open code editor',
        '  compile             Build current code',
        '  demo <chapter>      Run with soundtrack',
        '  visualize           Kernel visualization',
        '',
        '🔧 SYSTEM OPERATIONS',
        '  boot                Initialize boot sequence',
        '  panic               Trigger kernel panic',
        '  syscall <id>        Trace system call',
        '  memory              Display memory map',
        '',
        '💡 TIP: Try `boot` for the full experience!',
        ''
      ])
    },

    clear: () => {
      setHistory([])
    },

    list: () => {
      if (!tracks.length) {
        println('No tracks available. Check backend connection.')
        return
      }
      
      printBlock([
        '',
        '╔═══════════════════════════════════════════════════╗',
        '║              OS1000 TRACK CATALOG                 ║',
        '║              18 Educational Tracks                 ║',
        '╚═══════════════════════════════════════════════════╝',
        ''
      ])
      
      tracks.forEach((t, index) => {
        const statusIcon = t.status === 'ONLINE' ? '🟢' : 
                          t.status === 'PENDING' ? '🟡' : '🔴'
        const trackNum = (index).toString().padStart(2, '0')
        println(`  ${statusIcon} [${trackNum}] ${t.title}`)
        println(`       ID: ${t.id} | Duration: ${t.length}`)
        if (index < tracks.length - 1) println('')
      })
      
      printBlock([
        '',
        '  💡 Use `play <id>` to play any track',
        '  📹 Use `video <id>` for video experience',
        ''
      ])
    },

    play: async (id?: string) => {
      if (!id) {
        println('Usage: play <track-id>')
        println('Example: play kernel-panic')
        return
      }
      
      const track = tracks.find(t => t.id === id)
      if (!track) {
        println(`Track not found: ${id}`)
        println('Use `list` to see available tracks')
        return
      }
      
      // Embed-first playback per contract
      if (track.videoUrl) {
        println(`🎥 Loading video: ${track.title}`)
        println(`  Duration: ${track.length}`)
        println(`  Type 'close' to exit video player`)
        
        // Normalize video URL to embed format with autoplay muted
        let embedUrl = track.videoUrl
        try {
          if (embedUrl.includes('youtube.com/watch?v=') || embedUrl.includes('youtu.be/')) {
            const videoId = embedUrl.includes('youtu.be/') 
              ? embedUrl.split('youtu.be/')[1]?.split('?')[0]
              : new URL(embedUrl).searchParams.get('v')
            if (videoId) {
              embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
            }
          } else if (embedUrl.includes('youtube.com/embed/')) {
            // Already an embed URL, just add parameters
            const url = new URL(embedUrl)
            url.searchParams.set('autoplay', '1')
            url.searchParams.set('mute', '1') 
            url.searchParams.set('playsinline', '1')
            url.searchParams.set('rel', '0')
            url.searchParams.set('modestbranding', '1')
            embedUrl = url.toString()
          }
        } catch (error) {
          console.warn('Error processing video URL:', error)
        }
        
        setActiveVideo({
          url: embedUrl,
          id: track.id,
          title: track.title
        })
        
        // Trigger visual effect
        document.body.classList.add('os1000-playing')
        setTimeout(() => document.body.classList.remove('os1000-playing'), 2000)
      } else {
        println(`❌ Video not available for: ${track.title}`)
        println(`  View track on Lumina → https://lunadarkside.com/music`)
        println(`  Duration: ${track.length}`)
      }
    },

    status: async () => {
      setLoading(true)
      const status = await getSystemStatus()
      setLoading(false)
      
      if (!status) {
        println('Could not retrieve system status')
        return
      }
      
      const memPercent = Math.floor((status.memory.used_gb / status.memory.total_gb) * 100)
      
      printBlock([
        '',
        '╔═══════════════════════════════════════════════════╗',
        '║               SYSTEM STATUS REPORT                ║',
        '╚═══════════════════════════════════════════════════╝',
        '',
        `  🔥 CPU USAGE      ${status.cpu.usage}%`,
        `     [${generateBar(status.cpu.usage)}]`,
        '',
        `  💾 MEMORY         ${status.memory.used_gb}GB / ${status.memory.total_gb}GB (${memPercent}%)`,
        `     [${generateBar(memPercent)}]`,
        '',
        `  📊 LOAD AVERAGE   ${status.cpu.load.join(' / ')}`,
        `  🔢 PROCESSES      ${status.system.processes} active`,
        `  ⏱️  UPTIME         ${status.system.uptime_hours} hours`,
        `  🖥️  KERNEL         ${status.system.kernel}`,
        `  🌡️  TEMPERATURE    NOMINAL`,
        `  ⚡ PERFORMANCE    OPTIMAL`,
        ''
      ])
    },

    panic: () => {
      document.body.classList.add('os1000-panic')
      setTimeout(() => document.body.classList.remove('os1000-panic'), 1500)
      
      println('KERNEL PANIC - NOT SYNCING: Attempted to kill init!')
      println('[0.000000] CPU: 0 PID: 1 Comm: systemd Not tainted')
      println('[0.000000] Call Trace:')
      println('[0.000000]  panic+0x101/0x2c0')
      println('[0.000000]  do_exit+0x7f4/0xa50')
      println('[0.000000]  __x64_sys_exit+0x17/0x20')
      println('[SYSTEM HALTED]')
    },

    syscall: (id?: string) => {
      const syscallId = id || '42'
      println(`Tracing syscall(${syscallId})...`)
      println(`[TRACE] syscall(${syscallId})`)
      println(`[TRACE] -> entering kernel space`)
      println(`[TRACE] -> executing handler 0x${parseInt(syscallId).toString(16).padStart(4, '0')}`)
      println(`[TRACE] <- returning to user space`)
      println(`[TRACE] syscall(${syscallId}) = 0`)
      
      // Visual effect
      document.body.classList.add('os1000-syscall')
      setTimeout(() => document.body.classList.remove('os1000-syscall'), 800)
    },

    memory: () => {
      println('MEMORY LAYOUT:')
      println('  0x00007fff5fc00000  [HEAP]')
      println('  0x00007fff5fbff000  [STACK]')
      println('  0x0000000100000000  [TEXT]')
      println('  0x0000000100001000  [DATA]')
      println('  0x0000000100002000  [BSS]')
    },

    about: () => {
      printBlock([
        '',
        '╔═══════════════════════════════════════════════════╗',
        '║                    OS1000                         ║',
        '║        Operating System as Performance Art        ║',
        '╚═══════════════════════════════════════════════════╝',
        '',
        '  Version:     1.0.0 [STABLE]',
        '  Album:       "OS 1000" by Luna Darkside',
        '  Released:    2025',
        '  Tracks:      18 chapters of OS education',
        '',
        '  🎵 A revolutionary fusion of music and computing',
        '  📚 Learn operating systems through sound',
        '  💻 Interactive terminal with live coding',
        '  🎨 Where code execution becomes performance art',
        '',
        '  Created by:  Dallas McMillan',
        '  Platform:    https://os1000.dev',
        '  Stream:      YouTube Music / Spotify / Apple Music',
        '',
        '  "Teaching complex systems through electronic music"',
        ''
      ])
    },

    learn: (chapter?: string) => {
      const ch = chapter ? parseInt(chapter) : 0
      if (ch < 0 || ch >= OS_CURRICULUM.length) {
        println(`Invalid chapter. Choose 0-${OS_CURRICULUM.length - 1}`)
        return
      }
      
      setCurrentChapter(ch)
      const lesson = OS_CURRICULUM[ch]
      
      println(`\n━━━ CHAPTER ${ch}: ${lesson.concept.toUpperCase()} ━━━`)
      println(`Track: ${lesson.track}`)
      println(`\nConcept:`)
      println(`  ${lesson.concept}`)
      println(`\nCode example:`)
      println(`  ${lesson.code}`)
      println(`\nType 'play ${lesson.track}' to hear the soundtrack`)
      println(`Type 'next' to continue to chapter ${ch + 1}`)
      
      // Trigger visual effect
      document.body.classList.add('os1000-learn')
      setTimeout(() => document.body.classList.remove('os1000-learn'), 1000)
    },

    next: () => {
      const nextChapter = currentChapter + 1
      if (nextChapter >= OS_CURRICULUM.length) {
        println('Congratulations! You\'ve completed all chapters.')
        println('Type \'curriculum\' to review or \'learn 0\' to restart.')
        return
      }
      commands.learn(nextChapter.toString())
    },

    curriculum: () => {
      printBlock([
        '',
        '╔═══════════════════════════════════════════════════╗',
        '║            OS1000 LEARNING CURRICULUM             ║',
        '║         18 Chapters of OS Fundamentals           ║',
        '╚═══════════════════════════════════════════════════╝',
        ''
      ])
      
      OS_CURRICULUM.forEach((lesson, i) => {
        const icon = i === currentChapter ? '▶️' : i < currentChapter ? '✅' : '📖'
        const status = i === currentChapter ? ' ← CURRENT' : i < currentChapter ? ' (completed)' : ''
        println(`  ${icon} Chapter ${i.toString().padStart(2, '0')}: ${lesson.concept}${status}`)
      })
      
      printBlock([
        '',
        '  💡 Use `learn <number>` to jump to any chapter',
        '  ⏭️  Use `next` to continue from current chapter',
        '  🎵 Each chapter has its own soundtrack!',
        ''
      ])
    },

    boot: async () => {
      setKernelState('booting')
      
      // Clear and show boot logo
      setHistory([])
      printBlock([
        '',
        '     ██████╗ ███████╗ ██╗ ██████╗  ██████╗  ██████╗ ',
        '    ██╔═══██╗██╔════╝███║██╔═████╗██╔═████╗██╔═████╗',
        '    ██║   ██║███████╗╚██║██║██╔██║██║██╔██║██║██╔██║',
        '    ██║   ██║╚════██║ ██║████╔╝██║████╔╝██║████╔╝██║',
        '    ╚██████╔╝███████║ ██║╚██████╔╝╚██████╔╝╚██████╔╝',
        '     ╚═════╝ ╚══════╝ ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ',
        '',
        '           Operating System as Performance Art',
        ''
      ])
      
      await new Promise(r => setTimeout(r, 1000))
      
      println('Initializing boot sequence...')
      println('[0.000000] OS1000 Kernel 1.0.0')
      println('[0.000001] Command line: root=/dev/sda1 rw quiet splash')
      
      await new Promise(r => setTimeout(r, 500))
      println('[0.001000] Initializing memory management...')
      println('[0.002000] Setting up virtual memory...')
      println('[0.003000] Loading kernel modules...')
      
      await new Promise(r => setTimeout(r, 500))
      println('[0.004000] Starting scheduler...')
      println('[0.005000] Initializing device drivers...')
      println('[0.006000] Mounting filesystems...')
      
      await new Promise(r => setTimeout(r, 500))
      println('[  OK  ] Started Audio Subsystem')
      println('[  OK  ] Started Terminal Services')
      println('[  OK  ] Reached target Multi-User System')
      
      printBlock([
        '',
        '════════════════════════════════════════',
        '     OS1000 INITIALIZATION COMPLETE',
        '     System ready for interaction',
        '════════════════════════════════════════',
        '',
        'Type `help` for available commands.',
        ''
      ])
      
      setKernelState('running')
      
      // Play boot track with video
      setTimeout(() => {
        commands.play('boot')
      }, 500)
    },

    compile: () => {
      const lesson = OS_CURRICULUM[currentChapter]
      println(`Compiling chapter ${currentChapter}: ${lesson.concept}...`)
      println('gcc -Wall -O2 -o program main.c')
      
      // Simulate compilation
      setTimeout(() => {
        println('Compilation successful.')
        println('./program')
        println(`Output: ${lesson.concept} module loaded`)
      }, 1000)
    },

    visualize: () => {
      println('Launching kernel visualization...')
      document.body.classList.add('os1000-visualize')
      
      // Create simple ASCII visualization
      const frames = [
        '     [CPU]\n      |\n    [MMU]\n      |\n   [MEMORY]',
        '     [CPU]\n      ||\n    [MMU]\n      ||\n   [MEMORY]',
        '     [CPU]\n     |||\n    [MMU]\n     |||\n   [MEMORY]'
      ]
      
      let frame = 0
      const interval = setInterval(() => {
        println('\x1b[2J\x1b[H') // Clear screen escape code (visual only)
        println(frames[frame % frames.length])
        frame++
        
        if (frame > 9) {
          clearInterval(interval)
          document.body.classList.remove('os1000-visualize')
          println('Visualization complete.')
        }
      }, 300)
    },

    // Video commands
    video: async (id?: string) => {
      if (!id) {
        println('Usage: video <track-id>')
        println('Example: video intro-os-overture')
        return
      }
      
      const result = await playTrack(id)
      println(result.message)
    },

    close: () => {
      if (activeVideo) {
        setActiveVideo(null)
        println('Video player closed.')
      } else {
        println('No active video to close.')
      }
    },

    gallery: () => {
      println('VIDEO GALLERY:')
      const tracksWithVideo = tracks.filter(t => t.videoUrl)
      if (tracksWithVideo.length === 0) {
        println('No videos available yet.')
        return
      }
      
      tracksWithVideo.forEach(track => {
        println(`  [■] ${track.id} - ${track.title}`)
        println(`      Duration: ${track.length} | Status: ${track.status}`)
      })
      println('\nType "video <track-id>" to play any video')
    },

    // Debug command to check track data
    debug: (trackId?: string) => {
      if (trackId) {
        const track = tracks.find(t => t.id === trackId)
        if (track) {
          println(`DEBUG: Track found: ${track.title}`)
          println(`DEBUG: Has videoUrl: ${!!track.videoUrl}`)
          println(`DEBUG: VideoUrl: ${track.videoUrl || 'none'}`)
          println(`DEBUG: Has thumbnail: ${!!track.thumbnail}`)
        } else {
          println(`DEBUG: Track not found: ${trackId}`)
        }
      } else {
        println(`DEBUG: Total tracks loaded: ${tracks.length}`)
        println(`DEBUG: First track: ${tracks[0]?.title || 'none'}`)
        println(`DEBUG: Boot track exists: ${!!tracks.find(t => t.id === 'boot')}`)
      }
    },

    // Coding environment commands
    workbook: () => {
      println('━━━ OPENING INTERACTIVE OS1000 WORKBOOK ━━━')
      println('')
      println('📖 OS Development Workbook - Interactive Edition')
      println('   Each chapter contains:')
      println('   • Concept explanation with music soundtrack')
      println('   • Live code editor with syntax highlighting')
      println('   • Runnable examples and exercises')
      println('   • Video tutorials synchronized to code')
      println('')
      println('Available chapters:')
      OS_CURRICULUM.forEach((lesson, i) => {
        const badge = i <= 7 ? '✅' : '🔒'
        println(`  ${badge} ${i.toString().padStart(2, '0')}. ${lesson.concept}`)
      })
      println('')
      println('Usage: code <chapter> to open specific chapter environment')
    },

    code: (chapter?: string) => {
      const ch = chapter ? parseInt(chapter) : currentChapter
      if (ch < 0 || ch >= OS_CURRICULUM.length) {
        println(`Invalid chapter. Choose 0-${OS_CURRICULUM.length - 1}`)
        return
      }

      const lesson = OS_CURRICULUM[ch]
      println(`━━━ CODING ENVIRONMENT: ${lesson.concept.toUpperCase()} ━━━`)
      println('')
      println(`🎵 Now playing: ${lesson.track}`)
      println(`📝 Code editor loaded for: ${lesson.concept}`)
      println('')
      println('ENVIRONMENT FEATURES:')
      println('  • Live code compilation (gcc/rustc/node)')
      println('  • Syntax highlighting and autocomplete')  
      println('  • Real-time output window')
      println('  • Integrated debugger')
      println('  • Music-synchronized coding sessions')
      println('')
      println('STARTER CODE:')
      println(`  ${lesson.code}`)
      println('')
      println('Type "compile" to build | "demo" to run demo | "video" to see tutorial')
      
      // Auto-play the track for this chapter
      commands.play(lesson.track)
    },

    demo: (chapter?: string) => {
      const ch = chapter ? parseInt(chapter) : currentChapter
      if (ch < 0 || ch >= OS_CURRICULUM.length) {
        println(`Invalid chapter. Choose 0-${OS_CURRICULUM.length - 1}`)
        return
      }

      const lesson = OS_CURRICULUM[ch]
      println(`━━━ DEMO BUILD: ${lesson.concept.toUpperCase()} ━━━`)
      println('')
      println(`🎵 Music: ${lesson.track} (${tracks.find(t => t.id === lesson.track)?.length || 'unknown'})`)
      println(`🏗️  Building: ${lesson.concept} demonstration`)
      println('')
      
      // Simulate progressive build with music
      const buildSteps = [
        'Initializing development environment...',
        'Loading music synchronization engine...',
        `Compiling ${lesson.concept} modules...`,
        'Linking audio-visual components...',
        'Optimizing real-time performance...',
        'Demo build complete! 🎉'
      ]

      buildSteps.forEach((step, i) => {
        setTimeout(() => {
          println(`[${i + 1}/${buildSteps.length}] ${step}`)
          if (i === buildSteps.length - 1) {
            println('')
            println('🚀 Demo running with synchronized soundtrack')
            println('   Visual effects: Active')
            println('   Code execution: Live')
            println('   Music integration: Perfect sync')
            
            // Auto-play track and show video if available
            commands.play(lesson.track)
          }
        }, i * 800)
      })

      // Add visual effects during demo
      setTimeout(() => {
        document.body.classList.add('os1000-demo')
        setTimeout(() => document.body.classList.remove('os1000-demo'), 3000)
      }, 2000)
    }
  }

  const generateBar = (percent: number): string => {
    const filled = Math.floor(percent / 10)
    const empty = 10 - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
  }

  // Add portal navigation commands
  commands.portal = () => {
    println('Opening Luna Darkside portal...')
    println('https://lunadarkside.com')
    window.open('https://lunadarkside.com', '_blank')
  }

  commands.artist = () => {
    println('Artist profile lives on the Lumina portal.')
    println('Opening: https://lunadarkside.com/about')
    window.open('https://lunadarkside.com/about', '_blank')
  }

  commands.catalog = () => {
    println('Full catalog is curated on Lumina.')
    println('Opening: https://lunadarkside.com/music')
    window.open('https://lunadarkside.com/music', '_blank')
  }

  // Command allowlist for security
  const SAFE_COMMANDS = new Set([
    'help', 'clear', 'list', 'play', 'status', 'panic', 'syscall', 'memory', 'about',
    'learn', 'next', 'curriculum', 'boot', 'compile', 'visualize',
    'video', 'close', 'gallery', 'workbook', 'code', 'demo', 'debug',
    'portal', 'artist', 'catalog'
  ])

  const sanitizeInput = (input: string): string => {
    // Normalize and clean input
    return input
      .normalize('NFKC')
      .trim()
      .replace(/[<>\"'&]/g, '') // Remove potential HTML/JS injection chars
      .slice(0, 256) // Limit length
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const rawInput = input.trim()
    setInput('')
    
    if (!rawInput) return
    
    // Initialize AudioContext on first interaction
    await initializeAudioContext()
    
    // Sanitize input
    const cleanInput = sanitizeInput(rawInput)
    println(`OS1000:~$ ${cleanInput}`)
    
    const [cmd, ...args] = cleanInput.toLowerCase().split(/\s+/)
    
    // Check command allowlist
    if (!SAFE_COMMANDS.has(cmd)) {
      println(`Command not recognized: ${cmd}`)
      println('Type `help` for available commands')
      return
    }
    
    // Sanitize arguments
    const cleanArgs = args.map(arg => 
      arg.replace(/[^a-zA-Z0-9._\-]/g, '').slice(0, 128)
    )
    
    const command = commands[cmd]
    
    if (command) {
      try {
        await command(...cleanArgs)
      } catch (error) {
        console.warn('Command execution error:', error)
        println(`Error executing command: ${cmd}`)
      }
    } else {
      println(`Command not found: ${cmd}`)
      println('Type `help` for available commands')
    }
  }
  
  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + L = clear
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault()
        commands.clear()
      }
      // Ctrl/Cmd + K = clear (alternative)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        commands.clear()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="terminal" role="application" aria-label="OS1000 Interactive Terminal">
      <div className="terminal-header">
        <span className="terminal-title">OS1000 TERMINAL</span>
        <span className="terminal-status" aria-live="polite">● CONNECTED</span>
      </div>
      
      <div className="terminal-body">
        <div className="terminal-history" role="log" aria-label="Terminal output">
          {history.map((line, i) => (
            <div key={i} className="terminal-line" aria-live="polite">
              {line}
            </div>
          ))}
          {loading && <div className="terminal-line blink" aria-live="polite">Processing...</div>}
          <div ref={historyEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <span className="terminal-prompt" aria-hidden="true">OS1000:~$</span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            placeholder="type 'help' for commands"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
      
      <audio ref={audioRef} />
      
      {/* Embedded Video Player Overlay */}
      {activeVideo && (
        <div 
          className="video-player-overlay" 
          onClick={() => commands.close()}
          onKeyDown={(e) => e.key === 'Escape' && commands.close()}
        >
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <div className="video-header">
              <span className="video-title">{activeVideo.title}</span>
              <button className="video-close" onClick={() => commands.close()}>×</button>
            </div>
            
            <div className="video-content">
              {/* Embedded iframe player */}
              <div className="video-player">
                <iframe
                  ref={iframeRef}
                  src={activeVideo.url}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                />
              </div>
            </div>
            
            {/* Controls with unmute and external link */}
            <div className="video-controls">
              <button className="control-btn" onClick={() => {
                const iframe = iframeRef.current;
                if (iframe) {
                  iframe.src = iframe.src; // Restart video
                }
              }}>⟲ Restart</button>
              
              <button className="control-btn" onClick={() => {
                const originalUrl = tracks.find(t => t.id === activeVideo.id)?.videoUrl
                if (originalUrl) {
                  window.open(originalUrl, '_blank')
                }
              }}>📺 Watch on YouTube</button>
              
              <button className="control-btn glow-btn" onClick={() => commands.close()}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TerminalPlayer