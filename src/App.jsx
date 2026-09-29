import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sqicpllcgerwydrmwjqu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_PshFpqGI5igv7fKiIGPsaQ_wouAItW1'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// true = đã hết hạn khảo sát
const SURVEY_CLOSED = true

export default function App() {
  const [view, setView] = useState(SURVEY_CLOSED ? 'closed' : 'form')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

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
      alert('Không tải được kết quả khảo sát')
    } finally {
      setLoading(false)
    }
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
            onClick={() => {
              setView('results')
              loadResults()
            }}
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

  // ========== MÀN HÌNH KẾT QUẢ (giống style cũ) ==========
  if (view === 'results') {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header giống phiếu khảo sát */}
          <div className="bg-white rounded-t-xl border-t-4 border-red-700 shadow-sm p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="text-sm text-gray-700">
                <p className="font-bold text-red-800">UBND phường Thành Nhất</p>
                <p className="text-xs sm:text-sm">Địa chỉ: 178 Phan Huy Chú, phường Thành Nhất, tỉnh Đắk Lắk</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-800 text-sm sm:text-base">PHIẾU SỐ 01</p>
                <p className="text-xs sm:text-sm text-gray-600">Kết quả khảo sát</p>
              </div>
            </div>

            <h2 className="text-center text-base sm:text-xl font-bold text-red-800 uppercase leading-snug mt-2">
              KẾT QUẢ KHẢO SÁT
            </h2>
            <h3 className="text-center text-sm sm:text-base font-semibold text-red-700 mt-1 leading-snug">
              Tình hình thi hành văn bản quy phạm pháp luật<br />
              lĩnh vực an toàn thực phẩm trên địa bàn phường
            </h3>
          </div>

          {/* Nội dung kết quả */}
          <div className="bg-white rounded-b-xl shadow-sm p-5 sm:p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Đang tải kết quả khảo sát...</p>
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-center text-lg font-semibold text-red-800">
                    Tổng số phiếu đã nhận: <span className="text-2xl">{results.length}</span>
                  </p>
                </div>

                {results.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Chưa có dữ liệu khảo sát.</p>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {results.map((item, index) => (
                      <div key={item.id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-red-800">Phiếu #{results.length - index}</span>
                          <span className="text-xs text-gray-500">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleString('vi-VN')
                              : ''}
                          </span>
                        </div>
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words bg-white p-3 rounded border">
                          {JSON.stringify(item.answers || item, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setView('closed')}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition"
                  >
                    ← Quay lại
                  </button>
                </div>
              </>
            )}
          </div>

          <p className="text-center text-xs text-gray-500 mt-6 pb-4">
            © UBND phường Thành Nhất – Tỉnh Đắk Lắk
          </p>
        </div>
      </div>
    )
  }

  // Phòng trường hợp chưa đóng
  return null
}
