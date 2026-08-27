import { useState, useEffect } from 'react'
import './App.css'

// 1. 이미지 불러오기
import headerImg from './assets/header.jpg'
import introImg from './assets/intro.jpg'
import worshipImg from './assets/worship.jpg'
import locationImg from './assets/location.jpg'

// 텍스트 데이터를 저장할 타입 정의
interface ScheduleData {
  ministry: string[] // 사역내용
  yearly: string[]   // 연간 사업
  monthly: string[]  // 이번달 일정
}

function App() {
  const [activeTab, setActiveTab] = useState<'info' | 'time' | 'location' | 'schedule'>('schedule')
  
  // 구글 드라이브/서버의 churchhomeA.txt 내용을 담을 상태
  const [data, setData] = useState<ScheduleData>({
    ministry: [],
    yearly: [],
    monthly: []
  })

  // churchhomeA.txt 파일의 텍스트 파싱 처리
  const parseChurchText = (text: string) => {
    const sections = text.split(';').map((sec) => sec.trim())
    const result: ScheduleData = { ministry: [], yearly: [], monthly: [] }

    sections.forEach((section) => {
      const lines = section.split('\n').map((line) => line.trim()).filter(Boolean)
      if (lines.length === 0) return

      const title = lines[0]
      const items = lines.slice(1)

      if (title.includes('사역내용')) {
        result.ministry = items
      } else if (title.includes('사업')) {
        result.yearly = items
      } else if (title.includes('이번달일정') || title.includes('일정')) {
        result.monthly = items
      }
    })

    return result
  }

  useEffect(() => {
    // [참고] 실제 서버 연동 시에는 아래 주소를 txt 파일 URL로 교체합니다.
    // fetch('/path/to/churchhomeA.txt')
    
    // 드라이브의 churchhomeA.txt 내용 예시 데이터
    const rawText = `사역내용  
26.8.2/ 웰, 티  
26.8.9/ 웰, 린   
26.8.16/ 웰, 엘샤이  
;  
2026 사업  
1월/ 전도  
2월/ 전도  
;  
이번달일정  
8월/ 전도, 예배`

    // 데이터 불러와서 상태 업데이트
    const parsed = parseChurchText(rawText)
    setData(parsed)
  }, [])

  return (
    <div className="church-container">
      {/* 헤더 / 상단 바 */}
      <header className="church-header">
        <img src={headerImg} alt="Moving Church 메인" className="header-img" />
        <h1>Moving Church</h1>
        <p className="subtitle">하나님의 사랑이 가득한 공동체</p>
      </header>

      {/* 네비게이션 탭 */}
      <nav className="church-nav">
        <button 
          className={activeTab === 'schedule' ? 'active' : ''} 
          onClick={() => setActiveTab('schedule')}
        >
          사역 및 일정
        </button>
        <button 
          className={activeTab === 'info' ? 'active' : ''} 
          onClick={() => setActiveTab('info')}
        >
          교회 소개
        </button>
        <button 
          className={activeTab === 'time' ? 'active' : ''} 
          onClick={() => setActiveTab('time')}
        >
          예배 안내
        </button>
        <button 
          className={activeTab === 'location' ? 'active' : ''} 
          onClick={() => setActiveTab('location')}
        >
          오시는 길
        </button>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <main className="church-content">
        {/* 1. 사역 및 일정 탭 (churchhomeA.txt 연동 영역) */}
        {activeTab === 'schedule' && (
          <section className="tab-content">
            <h2>교회 사역 & 일정 안내</h2>

            {/* 이번달 일정 */}
            <div className="schedule-card">
              <h3>🗓️ 이번 달 일정</h3>
              <ul>
                {data.monthly.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 사역 내용 */}
            <div className="schedule-card">
              <h3>🤝 사역 내용</h3>
              <ul>
                {data.ministry.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 2026 사업 */}
            <div className="schedule-card">
              <h3>📌 2026 주요 사업</h3>
              <ul>
                {data.yearly.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 2. 교회 소개 탭 */}
        {activeTab === 'info' && (
          <section className="tab-content">
            <h2>교회에 오신 것을 환영합니다</h2>
            <img src={introImg} alt="교회 소개" className="content-img" />
            <p>우리 교회는 말씀을 중심으로 이웃을 섬기며 사랑을 나누는 공동체입니다.</p>
            <div className="hero-box">
              <p className="verse">"하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니..."</p>
              <p className="verse-ref">(요한복음 3장 16절)</p>
            </div>
          </section>
        )}

        {/* 3. 예배 안내 탭 */}
        {activeTab === 'time' && (
          <section className="tab-content">
            <h2>예배 시간 안내</h2>
            <img src={worshipImg} alt="예배 모습" className="content-img" />
            <ul className="schedule-list">
              <li>
                <strong>주일 대예배</strong>
                <span>주일 오전 11:00</span>
              </li>
              <li>
                <strong>주일 오후예배</strong>
                <span>주일 오후 2:00</span>
              </li>
              <li>
                <strong>수요기도회</strong>
                <span>수요일 오후 7:30</span>
              </li>
              <li>
                <strong>새벽기도회</strong>
                <span>월~금 오전 5:30</span>
              </li>
            </ul>
          </section>
        )}

        {/* 4. 오시는 길 탭 */}
        {activeTab === 'location' && (
          <section className="tab-content">
            <h2>오시는 길</h2>
            <img src={locationImg} alt="약도" className="content-img" />
            <div className="location-info">
              <p><strong>주소:</strong> OO시 OO구 OO로 123 (OO동)</p>
              <p><strong>전화번호:</strong> 02-123-4567</p>
              <p><strong>대중교통:</strong> 지하철 O호선 OO역 3번 출구 도보 5분</p>
            </div>
          </section>
        )}
      </main>

      {/* 푸터 */}
      <footer className="church-footer">
        <p>&copy; 2026 Moving Church. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App