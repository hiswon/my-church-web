import { useState } from 'react'
import './App.css'

// 1. assets 폴더에서 사진들을 불러옵니다. (파일명과 확장자를 맞춰주세요)
import headerImg from './assets/header.jpg'
import introImg from './assets/intro.jpg'
import worshipImg from './assets/worship.jpg'
import locationImg from './assets/location.jpg'

function App() {
  const [activeTab, setActiveTab] = useState<'info' | 'time' | 'location'>('info')

  return (
    <div className="church-container">
      {/* 헤더 / 상단 바 */}
      <header className="church-header">
        {/* 상단 메인 이미지 추가 */}
        <img src={headerImg} alt="Moving Church 메인" className="header-img" />
        
        <h1>Moving Church</h1>
        <p className="subtitle">하나님의 사랑이 가득한 공동체</p>
      </header>

      {/* 네비게이션 탭 */}
      <nav className="church-nav">
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
        {/* 1. 교회 소개 탭 */}
        {activeTab === 'info' && (
          <section className="tab-content">
            <h2>교회에 오신 것을 환영합니다</h2>
            {/* 교회 소개 사진 추가 */}
            <img src={introImg} alt="교회 소개" className="content-img" />
            
            <p>우리 교회는 말씀을 중심으로 이웃을 섬기며 사랑을 나누는 공동체입니다.</p>
            <div className="hero-box">
              <p className="verse">"하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니..."</p>
              <p className="verse-ref">(요한복음 3장 16절)</p>
            </div>
          </section>
        )}

        {/* 2. 예배 안내 탭 */}
        {activeTab === 'time' && (
          <section className="tab-content">
            <h2>예배 시간 안내</h2>
            {/* 예배 안내 사진 추가 */}
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

        {/* 3. 오시는 길 탭 */}
        {activeTab === 'location' && (
          <section className="tab-content">
            <h2>오시는 길</h2>
            {/* 약도 또는 지도 사진 추가 */}
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