import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sqicpllcgerwydrmwjqu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_PshFpqGI5igv7fKiIGPsaQ_wouAItW1'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// true = đã hết hạn
const SURVEY_CLOSED = true

export default function App() {
  const [view, setView] = useState(SURVEY_CLOSED ? 'closed' : 'form')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({})

  const loadResults = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('khao_sat_phieu1')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResults(data || [])
      calculateStats(data || [])
    } catch (err) {
      console.error(err)
      alert('Không tải được kết quả')
    } finally {
      setLoading(false)
    }
  }

  // Hàm tính thống kê
  const calculateStats = (data) => {
    const total = data.length
    if (total === 0) {
      setStats({})
      return
    }

    // Lấy tất cả câu trả lời
    const allAnswers = data.map(item => item.answers || {})

    // Hàm đếm số lần xuất hiện của từng lựa chọn
    const countOptions = (field) => {
      const counts = {}
      allAnswers.forEach(ans => {
        const value = ans[field]
        if (Array.isArray(value)) {
          value.forEach(v => {
            counts[v] = (counts[v] || 0) + 1
          })
        } else if (value) {
          counts[value] = (counts[value] || 0) + 1
        }
      })
      return counts
    }

    setStats({
      total,
      // Bạn có thể thêm các câu hỏi khác tương tự
      cau2: countOptions('cau2'),
      cau3: countOptions('cau3'),
      // Thêm các câu khác nếu cần
    })
  }

  // ========== MÀN HÌNH HẾT HẠN ==========
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
            onClick={() => {
              setView('results')
              loadResults()
            }}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition"
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

  // ========== MÀN HÌNH KẾT QUẢ (giống hình bạn gửi) ==========
  if (view === 'results') {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border-t-4 border-red-700 p-5 sm:p-6 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-red-800">Kết quả khảo sát</h1>
                <p className="text-sm text-gray-600 mt-1">Phiếu số 01 – UBND phường Thành Nhất</p>
              </div>
              <button
                onClick={() => setView('closed')}
                className="text-sm border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50"
              >
                ← Quay lại
              </button>
            </div>

            {/* Tổng số phiếu */}
            <div className="mt-5 p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-center text-red-800 font-medium">
                Tổng số phản hồi đã ghi nhận: <span className="text-2xl font-bold">{stats.total || 0}</span>
              </p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <div className="inline-block w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-600">Đang tải kết quả khảo sát...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Ví dụ phần A - Thông tin chung */}
              <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
                <h2 className="text-lg font-bold text-red-800 mb-4">A. Thông tin chung</h2>

                {/* Ví dụ một câu hỏi có thanh tiến trình */}
                {stats.cau2 && Object.keys(stats.cau2).length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">2. Đánh giá hiệu quả tuyên truyền</h3>
                    <div className="space-y-3">
                      {Object.entries(stats.cau2)
                        .sort((a, b) => b[1] - a[1])
                        .map(([option, count]) => {
                          const percent = ((count / stats.total) * 100).toFixed(1)
                          return (
                            <div key={option}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700">{option}</span>
                                <span className="font-medium text-red-700">{count} ({percent}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-red-600 h-2.5 rounded-full transition-all"
                                  style={{ width: `${percent}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )}

                {/* Bạn có thể copy đoạn trên để thêm các câu hỏi khác */}
                <p className="text-sm text-gray-500 mt-4">
                  * Đang hiển thị một số câu hỏi mẫu. Có thể bổ sung thêm các câu khác.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
