import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sqicpllcgerwydrmwjqu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_PshFpqGI5igv7fKiIGPsaQ_wouAItW1'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Bật true = đã hết hạn khảo sát
const SURVEY_CLOSED = true

export default function App() {
  const [view, setView] = useState(SURVEY_CLOSED ? 'closed' : 'form') // 'closed' | 'form' | 'success' | 'results'
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Hàm tải kết quả từ Supabase
  const loadResults = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('khao_sat_phieu1')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResults(data || [])
    } catch (err) {
      console.error(err)
      alert('Không tải được kết quả')
    } finally {
      setLoading(false)
    }
  }

  // Khi bấm xem kết quả
  const handleViewResults = () => {
    setView('results')
    loadResults()
  }

  // ========== MÀN HÌNH ĐÃ HẾT HẠN ==========
  if (view === 'closed') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center border-t-4 border-red-700">
          <div className="text-5xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-red-800 mb-3">
            Đã hết hạn điền khảo sát
          </h2>
          <p className="text-gray-600 mb-6">
            Thời gian thu thập phiếu khảo sát đã kết thúc.<br />
            Xin cảm ơn Ông/Bà đã quan tâm và tham gia.
          </p>

          <button
            onClick={handleViewResults}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Xem kết quả khảo sát
          </button>

          <p className="text-xs text-gray-500 mt-6">
            © UBND phường Thành Nhất – Tỉnh Đắk Lắk
          </p>
        </div>
      </div>
    )
  }

  // ========== MÀN HÌNH KẾT QUẢ ==========
  if (view === 'results') {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-red-800">Kết quả khảo sát</h1>
                <p className="text-sm text-gray-600 mt-1">Phiếu số 01 – UBND phường Thành Nhất</p>
              </div>
              <button
                onClick={() => setView('closed')}
                className="text-sm text-gray-600 hover:text-red-700"
              >
                ← Quay lại
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-600 py-10">Đang tải kết quả khảo sát...</p>
            ) : (
              <div>
                <p className="mb-4 text-gray-700">
                  Tổng số phiếu đã nhận: <strong>{results.length}</strong>
                </p>
                {/* Bạn có thể thêm bảng thống kê chi tiết ở đây sau */}
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {results.map((item, index) => (
                    <div key={item.id || index} className="border rounded-lg p-3 text-sm bg-gray-50">
                      <p className="font-medium text-gray-800">Phiếu #{index + 1}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.created_at ? new Date(item.created_at).toLocaleString('vi-VN') : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Nếu chưa đóng khảo sát thì hiện form bình thường (phần này giữ nguyên code cũ của bạn)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center">
        <p className="text-gray-600">Form khảo sát đang tạm ẩn vì đã hết hạn.</p>
      </div>
    </div>
  )
}
