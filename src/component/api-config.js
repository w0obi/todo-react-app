let backendHost;

const hostname = window && window.location && window.location.hostname;

// 브라우저의 도메인이 'localhost'일 때 백엔드 서버 주소를 로컬로 설정
if (hostname === 'localhost') {
backendHost = 'http://43.200.245.197:8080';
}

// 백엔드 API 주소 내보내기
export const API_BASE_URL = `${backendHost}`;
