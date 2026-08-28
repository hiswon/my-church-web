import { useState, useEffect } from 'react'
import './App.css'
import { db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import headerImg from './assets/header.jpg'
import introImg from './assets/intro.jpg'
import worshipImg from './assets/worship.jpg'
import locationImg from './assets/location.jpg'

const DRIVE_IMG_1 = 'https://lh3.googleusercontent.com/d/1pyi9KbaXypMf-muLxYqokAAcDMic0u1z'
const DRIVE_IMG_2 = 'https://lh3.googleusercontent.com/d/1vHwBaAGw3T3i_dyNLFS6ipjLQCx8RIBA'
const DRIVE_IMG_3 = 'https://lh3.googleusercontent.com/d/1nlC3fAIZr2BZN741agezvQGvcpWFidOD'

interface ScheduleData {
  monthly: string
  ministry: string
  yearly: string
}

function App() {
  const [activeTab, setActiveTab] = useState<'info' | 'time' | 'location' | 'schedule'>('schedule')
  
  // 데이터 관리
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    monthly: '8월/ 전도, 예배',
    ministry: '26.8.2/ 웰, 티\n26.8.9/ 웰, 린\n26.8.16/ 웰, 엘샤이',
    yearly: '1월/ 전도\n2월/ 전도'
  })

  // 관리자 관련 상태
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false)
  const [passwordInput, setPasswordInput] = useState<string>('')
  
  // 수정용 폼 상태
  const [editForm, setEditForm] = useState<ScheduleData>(scheduleData)

  // 1. Firebase에서 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'church', 'schedule')
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const fetched = docSnap.data() as ScheduleData
          setScheduleData(fetched)
          setEditForm(fetched)
        }
      } catch (error) {
        console.error('Firebase 데이터 로딩 오류:', error)
      }
    }
    fetchData()
  }, [])

  // 2. 비밀번호 확인
  const handleAdminLogin = () => {
    // 원하는 암호로 설정하세요 (예: 1234)
    if (passwordInput === '1234') {
      setIsAdmin(true)
      setShowPasswordModal(false)
      setPasswordInput('')
      alert('관리자 모드로 로그인되었습니다.')
    } else {
      alert('비밀번호가 올바르지 않습니다.')
    }
  }

  // 3. Firebase에 수정 데이터 저장하기
  const handleSaveData = async () => {
    try {
      await setDoc(doc(db, 'church', 'schedule'), editForm)
      setScheduleData(editForm)
      alert('성공적으로 저장되었습니다!')
    } catch (error) {
      console.error('저장 실패:', error)
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="church-container">
      {/* 헤더 */}
      <header className="church-header">
        <img src={headerImg} alt="Moving Church 메인" className="header-img" />
        <h1>Moving Church</h1>
        <p className="subtitle">하나님의 사랑이 가득한 공동체</p>
        
        {/* 관리자 모드 접속 버튼 */}
        <div className="admin-bar">
          {!isAdmin ? (
            <button className="admin-btn" onClick={() => setShowPasswordModal(true)}>
              🔒 관리자 로그인
            </button>
          ) : (
            <button className="admin-btn logout" onClick={() => setIsAdmin(false)}>
              🔓 관리자 로그아웃
            </button>
          )}
        </div>
      </header>

      {/* 비밀번호 입력 모달 */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>관리자 비밀번호 입력</h3>
            <input
              type="password"
              placeholder="비밀번호"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <div className="modal-buttons">
              <button onClick={handleAdminLogin}>확인</button>
              <button onClick={() => setShowPasswordModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 네비게이션 탭 */}
      <nav className="church-nav">
        <button className={activeTab === 'schedule' ? 'active' : ''} onClick={() => setActiveTab('schedule')}>
          사역 및 일정
        </button>
        <button className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>
          교회 소개
        </button>
        <button className={activeTab === 'time' ? 'active' : ''} onClick={() => setActiveTab('time')}>
          예배 안내
        </button>
        <button className={activeTab === 'location' ? 'active' : ''} onClick={() => setActiveTab('location')}>
          오시는 길
        </button>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="church-content">
        {activeTab === 'schedule' && (
          <section className="tab-content">
            <h2>교회 사역 & 일정 안내</h2>

            {/* 관리자 모드일 때 나타나는 데이터 수정 폼 */}
            {isAdmin && (
              <div className="admin-editor-box">
                <h3>✏️ 관리자 내용 수정하기</h3>
                <label>
                  <strong>이번 달 일정:</strong>
                  <textarea
                    rows={3}
                    value={editForm.monthly}
                    onChange={(e) => setEditForm({ ...editForm, monthly: e.target.value })}
                  />
                </label>
                <label>
                  <strong>사역 내용:</strong>
                  <textarea
                    rows={4}
                    value={editForm.ministry}
                    onChange={(e) => setEditForm({ ...editForm, ministry: e.target.value })}
                  />
                </label>
                <label>
                  <strong>2026 주요 사업:</strong>
                  <textarea
                    rows={4}
                    value={editForm.yearly}
                    onChange={(e) => setEditForm({ ...editForm, yearly: e.target.value })}
                  />
                </label>
                <button className="save-btn" onClick={handleSaveData}>
                  💾 저장하기
                </button>
              </div>
            )}

            {/* 일반 사용자 화면 카드 */}
            <div className="schedule-card">
              <img src={DRIVE_IMG_1} alt="이번달 일정" className="card-img" />
              <h3>🗓️ 이번 달 일정</h3>
              <ul>
                {scheduleData.monthly.split('\n').map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="schedule-card">
              <img src={DRIVE_IMG_2} alt="사역 내용" className="card-img" />
              <h3>🤝 사역 내용</h3>
              <ul>
                {scheduleData.ministry.split('\n').map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="schedule-card">
              <img src={DRIVE_IMG_3} alt="2026 주요 사업" className="card-img" />
              <h3>📌 2026 주요 사업</h3>
              <ul>
                {scheduleData.yearly.split('\n').map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 기타 탭 (소개, 예배, 오시는 길) */}
        {activeTab === 'info' && (
          <section className="tab-content">
            <h2>교회에 오신 것을 환영합니다</h2>
            <img src={introImg} alt="교회 소개" className="content-img" />
            <p>우리 교회는 말씀을 중심으로 이웃을 섬기며 사랑을 나누는 공동체입니다.</p>
          </section>
        )}

        {activeTab === 'time' && (
          <section className="tab-content">
            <h2>예배 시간 안내</h2>
            <img src={worshipImg} alt="예배 모습" className="content-img" />
          </section>
        )}

        {activeTab === 'location' && (
          <section className="tab-content">
            <h2>오시는 길</h2>
            <img src={locationImg} alt="약도" className="content-img" />
          </section>
        )}
      </main>

      <footer className="church-footer">
        <p>&copy; 2026 Moving Church. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App