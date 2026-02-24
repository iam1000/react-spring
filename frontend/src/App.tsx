import { useState, useEffect } from 'react';
import apiClient from './api/axiosSetup';
import './index.css';

function App() {
  const [serverMessage, setServerMessage] = useState<string>('서버 응답 대기 중...');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/test');
        setServerMessage(
          response.data.message + "\n(DB 상태: " + response.data.db_target + ")"
        );
      } catch (error) {
        console.error("통신 에러!", error);
        setServerMessage('백엔드 서버와 연결할 수 없습니다. 터미널을 확인해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold mb-1">
            React + Spring Boot (Supabase)
          </div>
          <h1 className="block mt-1 text-2xl leading-tight font-bold text-white mb-4">
            초기 연동 테스트 완료
          </h1>

          <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-xs mb-2">백엔드 서버 API 응답 결과:</h3>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <p className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {serverMessage}
              </p>
            )}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            응답 새로고침
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
