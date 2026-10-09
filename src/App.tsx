import './App.css'

// src/pics 폴더 안의 이미지들을 자동으로 불러옵니다 (png, jpg, jpeg, webp 등 지원)
const images = import.meta.glob<{ default: string }>('./pics/*.{png,jpg,jpeg,webp}', { eager: true });

// 객체로 가져온 이미지들을 배열 형태로 변환하고 파일명 기준 또는 기본 순서로 정렬
const imageSrcs = Object.values(images).map((img) => img.default);

interface SlideData {
  id: number;
  subTitle: string;
  mainTitle: string;
  highlightText: string;
  bibleVerse: string;
}

function App() {
  // 슬라이드 데이터 (원하는 만큼 추가/수정 가능하며, 사진은 pics 폴더 안의 파일명과 매칭됩니다)
  const slides: SlideData[] = [
    {
      id: 1,
      subTitle: "Moving Church",
      mainTitle: "무빙처치",
      highlightText: "하나님은 당신을 사랑하십니다.",
      bibleVerse: "요한복음 3장 16절",
    },
    {
      id: 2,
      subTitle: "Moving Church",
      mainTitle: "하나님은 당신을 사랑하십니다.",
      highlightText: "너는 도우시는 이가 누구인가",
      bibleVerse: "시편 121편 1-2절",
    },
    {
      id: 3,
      subTitle: "Moving Church",
      mainTitle: "무빙처치 3",
      highlightText: "평안을 너희에게 끼치노라",
      bibleVerse: "요한복음 14장 27절",
    },
  ];

  return (
    <div className="background-container">
      {/* 파워포인트 슬라이드 효과를 내는 스크롤 컨테이너 */}
      <div className="slides-wrapper">
        {slides.map((slide, index) => {
          const bgImage = imageSrcs.length > 0 ? imageSrcs[index % imageSrcs.length] : '';
          return (
            <div className="content-box" key={slide.id}>
              <div className="img-item">
                <img 
                  src={bgImage} 
                  alt={`Slide ${index + 1}`} 
                  className="img-wrapper"
                  onError={(e) => {
                    // 이미지가 없을 경우 대체 화면 처리 (선택사항)
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              
              {/* 우측 텍스트 그룹 */}
              <div className="text-group">
                <span className="sub-title">{slide.subTitle}</span>
                <h1 className="main-title">{slide.mainTitle}</h1>
                <h2 className="highlight-text">{slide.highlightText}</h2>
                <p className="bible-verse">{slide.bibleVerse}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App