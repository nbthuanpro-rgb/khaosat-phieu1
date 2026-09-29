import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'

// Thay 2 giá trị này bằng URL và anon key thật của bạn từ Supabase
const SUPABASE_URL = 'https://sqicpllcgerwydrmwjqu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_PshFpqGI5igv7fKiIGPsaQ_wouAItW1'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ========== BẬT / TẮT KHẢO SÁT TẠI ĐÂY ==========
const SURVEY_CLOSED = true   // true = đã hết hạn, false = còn mở
// ================================================

export default function App() {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      cau1: [],
      cau4: [],
      cau5: [],
      cau6: [],
      cau7: [],
      cau8: [],
      cau9: [],
      cau11: [],
      cau13: [],
      cau15: [],
    }
  })
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const cau3 = watch('cau3')

  const onSubmit = async (data) => {
    setErrorMsg('')
    try {
      const { error } = await supabase
        .from('khao_sat_phieu1')
        .insert([{ answers: data }])

      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Có lỗi khi gửi phiếu. Vui lòng thử lại.')
    }
  }

  // ========== MÀN HÌNH ĐÃ HẾT HẠN ==========
  if (SURVEY_CLOSED) {
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

          {/* Nút xem kết quả - thay link bên dưới nếu có trang kết quả riêng */}
          <a
            href="https://khaosat-phieu1.vercel.app/"   // ← tạm thời để lại link hiện tại, sau này đổi nếu có trang kết quả riêng
            className="inline-block w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Xem kết quả khảo sát
          </a>

          <p className="text-xs text-gray-500 mt-6">
            © UBND phường Thành Nhất – Tỉnh Đắk Lắk
          </p>
        </div>
      </div>
    )
  }

  // ========== PHẦN CÒN LẠI GIỮ NGUYÊN (khi SURVEY_CLOSED = false) ==========
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center border-t-4 border-green-600">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700 mb-3">Cảm ơn Ông/Bà!</h2>
          <p className="text-gray-700">Phiếu khảo sát đã được gửi thành công.</p>
          <p className="text-sm text-gray-500 mt-4">Mọi thông tin chỉ dùng cho mục đích tổng hợp, đánh giá và hoàn thiện chính sách, pháp luật về an toàn thực phẩm.</p>
        </div>
      </div>
    )
  }

  // ... (phần form giữ nguyên như cũ)
  // Bạn không cần copy lại toàn bộ form, chỉ cần thay phần đầu như trên là được.
}
