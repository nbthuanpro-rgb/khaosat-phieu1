import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'

// Thay 2 giá trị này bằng URL và anon key thật của bạn từ Supabase
const SUPABASE_URL = 'https://sqicpllcgerwydrmwjqu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_PshFpqGI5igv7fKiIGPsaQ_wouAItW1'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

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
      if (SUPABASE_URL.includes('YOUR_PROJECT')) {
        console.log('Dữ liệu khảo sát:', data)
        alert('Demo: Dữ liệu đã log ra console (F12). Hãy cấu hình Supabase để lưu thật.')
        setSubmitted(true)
        return
      }
      const { error } = await supabase.from('khao_sat_phieu1').insert([{
        ...data,
        submitted_at: new Date().toISOString()
      }])
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Có lỗi khi gửi phiếu. Vui lòng thử lại.')
    }
  }

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

  const CheckboxGroup = ({ name, options, register }) => (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" value={opt} {...register(name)} className="mt-1 accent-red-700 flex-shrink-0" />
          <span className="text-sm text-gray-800 leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  )

  const RadioGroup = ({ name, options, register }) => (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2 cursor-pointer">
          <input type="radio" value={opt} {...register(name)} className="mt-1 accent-red-700 flex-shrink-0" />
          <span className="text-sm text-gray-800 leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header theo đúng file Word */}
        <div className="bg-white rounded-t-xl border-t-4 border-red-700 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="text-sm text-gray-700">
              <p className="font-bold text-red-800">UBND phường Thành Nhất</p>
              <p className="text-xs sm:text-sm">Địa chỉ: 178 Phan Huy Chú,<br className="sm:hidden" /> phường Thành Nhất, tỉnh Đắk Lắk</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-red-800 text-sm sm:text-base">PHIẾU SỐ 01</p>
              <p className="text-xs sm:text-sm text-gray-600">Dành cho cán bộ, công chức,<br />viên chức trên địa bàn phường</p>
            </div>
          </div>

          <h2 className="text-center text-base sm:text-xl font-bold text-red-800 uppercase leading-snug mt-4">
            PHIẾU KHẢO SÁT
          </h2>
          <h3 className="text-center text-sm sm:text-base font-semibold text-red-700 mt-1 leading-snug">
            Tình hình thi hành văn bản quy phạm pháp luật<br />
            lĩnh vực an toàn thực phẩm trên địa bàn phường
          </h3>

          <p className="text-xs sm:text-sm text-gray-700 mt-4 text-justify leading-relaxed">
            Nhằm thu thập thông tin, ý kiến phản ánh của cán bộ, công chức, viên chức để đánh giá tình hình thi hành văn bản quy phạm pháp luật trong lĩnh vực an toàn thực phẩm trên địa bàn phường, trọng tâm là: quản lý thực phẩm chức năng, kiểm nghiệm thực phẩm và quản lý các cơ sở không thuộc diện cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm, đề nghị ông/bà vui lòng trả lời các câu hỏi sau bằng cách đánh dấu (x) vào ô có nội dung phù hợp. Các thông tin ông/bà cung cấp chỉ sử dụng cho mục đích tổng hợp, đánh giá và hoàn thiện chính sách, pháp luật về an toàn thực phẩm.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-b-xl shadow-sm p-5 sm:p-6 space-y-8">
          {/* A. THÔNG TIN CHUNG */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-red-700 border-b border-red-200 pb-2 mb-4">A. THÔNG TIN CHUNG</h3>
            <p className="text-sm text-gray-600 mb-4">Ông/bà vui lòng cho biết một số thông tin về cá nhân:</p>
            
            <div className="space-y-5">
              <div>
                <label className="block font-medium text-sm mb-1">1. Cơ quan, đơn vị công tác:</label>
                <input {...register('co_quan')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Nhập tên cơ quan/đơn vị..." />
              </div>

              <div>
                <label className="block font-medium text-sm mb-2">2. Cấp công tác:</label>
                <RadioGroup name="cap_cong_tac" register={register} options={['Cấp tỉnh', 'Cấp xã, phường', 'Khác']} />
                <input {...register('cap_cong_tac_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Nếu chọn Khác, vui lòng ghi rõ..." />
              </div>

              <div>
                <label className="block font-medium text-sm mb-2">3. Ngành/lĩnh vực quản lý hoặc công tác chủ yếu:</label>
                <RadioGroup name="nganh" register={register} options={['Y tế', 'Nông nghiệp và Môi trường', 'Công Thương', 'Khác']} />
              </div>

              <div>
                <label className="block font-medium text-sm mb-2">4. Thời gian tham gia công tác liên quan đến an toàn thực phẩm:</label>
                <RadioGroup name="thoi_gian" register={register} options={['Dưới 01 năm', 'Từ 01 đến dưới 05 năm', 'Từ 05 năm trở lên']} />
              </div>
            </div>
          </section>

          {/* B. PHẦN KHẢO SÁT */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-red-700 border-b border-red-200 pb-2 mb-4">B. PHẦN KHẢO SÁT</h3>

            {/* Câu 1 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 1. Đơn vị/địa phương đã tuyên truyền, phổ biến pháp luật về an toàn thực phẩm bằng hình thức nào? <span className="text-gray-500 font-normal">(có thể lựa chọn nhiều phương án)</span></h4>
              <CheckboxGroup name="cau1" register={register} options={[
                'Thông qua hội nghị, tọa đàm, hội thảo',
                'Qua các trang thông tin điện tử, báo chí, mạng xã hội',
                'Qua hệ thống phát thanh, truyền hình',
                'Qua tài liệu tuyên truyền: sách pháp luật, sổ tay, tờ rơi, tờ gấp',
                'Qua các cuộc thi tìm hiểu pháp luật',
                'Qua các cuộc họp thôn, buôn, tổ dân phố',
                'Tổ chức truyền thông lưu động, băng rôn, khẩu hiệu, áp phích',
                'Hình thức khác (đề nghị nêu rõ)',
                'Không triển khai thực hiện'
              ]} />
              <input {...register('cau1_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Nếu chọn Hình thức khác, vui lòng ghi rõ..." />
            </div>

            {/* Câu 2 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 2. Ông/bà đánh giá về hiệu quả của hoạt động tuyên truyền, phổ biến pháp luật về an toàn thực phẩm thời gian qua?</h4>
              <RadioGroup name="cau2" register={register} options={['Hiệu quả', 'Không hiệu quả']} />
            </div>

            {/* Câu 3 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 3. Ông/bà đánh giá về việc bố trí nguồn lực thực hiện công tác thi hành pháp luật về an toàn thực phẩm tại đơn vị/địa phương?</h4>
              <RadioGroup name="cau3" register={register} options={[
                'Bảo đảm (chọn phương án này thì bỏ qua Câu 7)',
                'Chưa bảo đảm'
              ]} />
            </div>

            {/* Câu 4 - hiện khi chọn "Chưa bảo đảm" (theo logic thực tế; note: file Word ghi bỏ qua Câu 7 nhưng nội dung Câu 4 là lý do nguồn lực) */}
            {cau3 === 'Chưa bảo đảm' && (
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-sm mb-2">Câu 4. Theo ông/bà, lý do việc bố trí nguồn lực thực hiện công tác thi hành pháp luật về an toàn thực phẩm chưa bảo đảm?</h4>
                <CheckboxGroup name="cau4" register={register} options={[
                  'Cán bộ, công chức còn thiếu, kiêm nhiệm nhiều công việc',
                  'Một số cán bộ còn hạn chế về trình độ chuyên môn, nghiệp vụ, chưa đáp ứng yêu cầu nhiệm vụ',
                  'Thiếu công cụ hỗ trợ trực tiếp cho cán bộ đi kiểm tra tại hiện trường (như phương tiện di chuyển, máy tính bảo mật dữ liệu, trang phục bảo hộ)',
                  'Cán bộ thường xuyên thay đổi vị trí công tác nên việc nắm bắt nội dung pháp luật về an toàn thực phẩm chưa sâu',
                  'Ý kiến khác (đề nghị nêu rõ)'
                ]} />
                <input {...register('cau4_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
              </div>
            )}

            {/* Câu 5 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 5. Ông/bà cho biết các hành vi vi phạm pháp luật trong quản lý thực phẩm chức năng đã xảy ra thời gian qua? <span className="text-gray-500 font-normal">(có thể lựa chọn nhiều phương án)</span></h4>
              <CheckboxGroup name="cau5" register={register} options={[
                'Sản xuất, kinh doanh thực phẩm chức năng không bảo đảm điều kiện an toàn thực phẩm hoặc không rõ nguồn gốc, xuất xứ',
                'Sản xuất hoặc nhập khẩu sản phẩm thuộc diện phải đăng ký bản công bố sản phẩm nhưng không đăng ký bản công bố sản phẩm; hoặc đã sản xuất, nhập khẩu sản phẩm thuộc diện phải đăng ký nhưng không có Giấy tiếp nhận đăng ký bản công bố sản phẩm theo quy định',
                'Quảng cáo thực phẩm chức năng sai sự thật, quá công dụng, gây hiểu nhầm sản phẩm là thuốc hoặc có tác dụng thay thế thuốc chữa bệnh',
                'Ghi nhãn sản phẩm thực phẩm chức năng không đúng quy định, thiếu nội dung bắt buộc hoặc gây hiểu nhầm về thành phần, công dụng, chất lượng sản phẩm',
                'Sử dụng phiếu kiểm nghiệm không hợp lệ, không đúng sản phẩm, không đúng lô hàng hoặc có dấu hiệu giả mạo',
                'Kinh doanh, quảng cáo thực phẩm chức năng trên mạng xã hội, sàn thương mại điện tử, livestream nhưng không cung cấp đầy đủ thông tin về nguồn gốc, xuất xứ, hồ sơ công bố, tổ chức/cá nhân chịu trách nhiệm về sản phẩm',
                'Không thu hồi, xử lý hoặc báo cáo cơ quan có thẩm quyền khi phát hiện sản phẩm thực phẩm chức năng không bảo đảm an toàn',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau5_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 6 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 6. Ông/bà cho biết những khó khăn, vướng mắc thường gặp trong công tác quản lý thực phẩm chức năng, thực phẩm thời gian qua?</h4>
              <CheckboxGroup name="cau6" register={register} options={[
                'Khó khăn trong phân biệt, áp dụng thống nhất các khái niệm “thực phẩm chức năng”, “thực phẩm bảo vệ sức khỏe”, “thực phẩm bổ sung”',
                'Sản phẩm thực phẩm chức năng ngày càng đa dạng, số lượng lưu hành lớn, gây khó khăn cho công tác theo dõi, hậu kiểm',
                'Hoạt động kinh doanh thực phẩm chức năng qua mạng xã hội, thương mại điện tử, hàng “xách tay” diễn biến phức tạp, khó kiểm soát chủ thể và chất lượng sản phẩm',
                'Tình trạng quảng cáo thực phẩm chức năng sai sự thật, quảng cáo quá công dụng, gây hiểu nhầm sản phẩm có tác dụng như thuốc còn xảy ra',
                'Một số sản phẩm tự công bố không đúng nhóm sản phẩm, ghi công dụng như thực phẩm chức năng, gây khó khăn cho công tác quản lý và hậu kiểm',
                'Một số cơ sở, doanh nghiệp thay đổi địa điểm, tạm ngừng hoạt động, giải thể hoặc không còn hoạt động tại địa chỉ đăng ký, gây khó khăn cho công tác kiểm tra, hậu kiểm',
                'Việc kiểm soát số lượng sản phẩm thực tế đang lưu thông còn khó khăn do giấy tiếp nhận đăng ký bản công bố sản phẩm không quy định thời hạn hiệu lực',
                'Chồng chéo hoặc chưa rõ ràng về thẩm quyền thanh tra, kiểm tra, hậu kiểm đối với cơ sở vừa kinh doanh thực phẩm thông thường, vừa kinh doanh thực phẩm chức năng (đặc biệt là các quầy thuốc, nhà thuốc tư nhân)',
                'Việc hậu kiểm thực phẩm chức năng sau khi được cấp Giấy tiếp nhận đăng ký bản công bố sản phẩm còn khó khăn do sản phẩm lưu thông trên nhiều địa bàn, kinh doanh qua mạng xã hội, sàn thương mại điện tử, livestream, hàng xách tay và khó xác định đầy đủ chủ thể chịu trách nhiệm',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau6_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 7 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 7. Ông/bà cho biết các hành vi vi phạm pháp luật trong kiểm nghiệm thực phẩm đã xảy ra trong thời gian qua? <span className="text-gray-500 font-normal">(có thể lựa chọn nhiều phương án)</span></h4>
              <CheckboxGroup name="cau7" register={register} options={[
                'Lấy mẫu, bảo quản, niêm phong, vận chuyển và gửi mẫu kiểm nghiệm thực phẩm không đúng quy định',
                'Kiểm nghiệm không đúng chỉ tiêu, phương pháp, tiêu chuẩn, quy chuẩn kỹ thuật hoặc gửi mẫu đến cơ sở kiểm nghiệm không đủ điều kiện theo quy định',
                'Sử dụng phiếu kết quả kiểm nghiệm không hợp lệ, không đúng mẫu sản phẩm, sửa chữa, làm sai lệch hoặc sử dụng không trung thực kết quả kiểm nghiệm',
                'Không cung cấp mẫu, hồ sơ, tài liệu phục vụ kiểm nghiệm khi cơ quan chức năng yêu cầu',
                'Không thu hồi, xử lý sản phẩm khi kết quả kiểm nghiệm xác định sản phẩm không bảo đảm an toàn thực phẩm',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau7_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 8 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 8. Ông/bà cho biết những hành vi vi phạm pháp luật về an toàn thực phẩm đã xảy ra tại các cơ sở không thuộc diện cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm trong thời gian qua? <span className="text-gray-500 font-normal">(có thể lựa chọn nhiều phương án)</span></h4>
              <CheckboxGroup name="cau8" register={register} options={[
                'Không thực hiện ký cam kết bảo đảm an toàn thực phẩm hoặc không thực hiện đúng nội dung đã cam kết',
                'Không duy trì điều kiện bảo đảm an toàn thực phẩm trong sản xuất, kinh doanh, chế biến, bảo quản, vận chuyển, bày bán thực phẩm',
                'Không bảo đảm vệ sinh cơ sở, trang thiết bị, dụng cụ, nguồn nước; không bảo đảm điều kiện sức khỏe, kiến thức, thực hành vệ sinh của người trực tiếp sản xuất, kinh doanh thực phẩm',
                'Sử dụng thực phẩm, nguyên liệu, phụ gia, chất hỗ trợ chế biến không rõ nguồn gốc, xuất xứ, hết hạn sử dụng hoặc không bảo đảm an toàn',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau8_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 9 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 9. Ông/bà cho biết những khó khăn, vướng mắc thường gặp trong quản lý cơ sở không thuộc diện cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm?</h4>
              <CheckboxGroup name="cau9" register={register} options={[
                'Cơ sở phần lớn có quy mô nhỏ lẻ, hộ gia đình, kinh doanh thời vụ, đa ngành hàng, đa loại hình, thường xuyên biến động hoặc không có địa điểm cố định, gây khó khăn trong việc rà soát, thống kê, phân loại theo ngành, lĩnh vực quản lý và tổ chức kiểm tra, hậu kiểm theo quy định',
                'Một số loại hình cơ sở như nhà hàng trong khách sạn, bếp ăn tập thể, homestay, khu nghỉ dưỡng… không thuộc diện phải cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm nhưng vẫn phục vụ số lượng lớn người tiêu dùng, làm phát sinh khó khăn trong công tác theo dõi, kiểm tra, hậu kiểm và xác định trách nhiệm quản lý trên địa bàn',
                'Việc quản lý cơ sở không thuộc diện cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm giữa các ngành còn có điểm chưa thống nhất, nhất là về đối tượng phải ký cam kết, hình thức quản lý, trách nhiệm hậu kiểm và chế độ thông tin, báo cáo',
                'Một số cơ sở kinh doanh thức ăn đường phố nhỏ lẻ, địa điểm kinh doanh không cố định nên khó khăn trong việc chấp hành và đáp ứng đầy đủ các quy định về điều kiện an toàn thực phẩm trong sản xuất, kinh doanh thực phẩm',
                'Việc ký cam kết bảo đảm an toàn thực phẩm và kiểm tra sau ký cam kết còn hạn chế, chưa bao quát đầy đủ các cơ sở thuộc diện quản lý',
                'Việc kiểm tra, giám sát điều kiện bảo đảm an toàn thực phẩm tại cơ sở còn khó khăn do phải tham chiếu nhiều quy định, tiêu chuẩn, quy chuẩn khác nhau',
                'Một số địa phương còn thiếu kinh nghiệm quản lý đối tượng nhỏ lẻ trong khi số lượng các đối tượng sản xuất, kinh doanh nhỏ lẻ tại các địa phương là rất lớn nên việc thực thi và xử lý vi phạm các quy định về an toàn thực phẩm còn gặp nhiều khó khăn',
                'Nhân lực, kinh phí, phương tiện, trang thiết bị phục vụ kiểm tra, hậu kiểm còn hạn chế',
                'Nhận thức của các chủ hộ kinh doanh nhỏ lẻ, thức ăn đường phố còn rất hạn chế',
                'Thiếu nhân lực quản lý ở cấp cơ sở (sau khi sáp nhập hoặc tinh gọn bộ máy)',
                'Thẩm quyền xử lý vi phạm của cấp xã đối với loại hình này còn gặp vướng mắc, khó áp dụng',
                'Chưa có hệ thống cơ sở dữ liệu dùng chung để theo dõi biến động của các cơ sở này',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau9_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 10 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 10. Ông/bà đánh giá như thế nào về việc triển khai và hiệu quả công tác thanh tra, kiểm tra việc chấp hành pháp luật về an toàn thực phẩm trong thời gian qua?</h4>
              <RadioGroup name="cau10" register={register} options={[
                'Triển khai thường xuyên, kịp thời phát hiện và xử lý vi phạm theo quy định',
                'Triển khai chưa thường xuyên; việc phát hiện, xử lý vi phạm còn hạn chế',
                'Có phát hiện vi phạm nhưng việc xử lý chưa kịp thời hoặc chưa đầy đủ',
                'Không triển khai công tác thanh tra, kiểm tra',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau10_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 11 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 11. Ông/bà cho biết các hình thức xử lý vi phạm pháp luật về an toàn thực phẩm mà cơ quan có thẩm quyền đã áp dụng thời gian qua? <span className="text-gray-500 font-normal">(có thể lựa chọn nhiều phương án)</span></h4>
              <CheckboxGroup name="cau11" register={register} options={[
                'Xử lý vi phạm hành chính',
                'Xử lý hình sự',
                'Chưa phát hiện/chưa áp dụng hình thức xử lý',
                'Không biết'
              ]} />
            </div>

            {/* Câu 12 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 12. Ông/bà đánh giá về tính kịp thời, hiệu quả và những khó khăn khi áp dụng các quy định mới của Nghị định số 90/2026/NĐ-CP trong việc xử lý vi phạm an toàn thực phẩm?</h4>
              <RadioGroup name="cau12" register={register} options={[
                'Kịp thời, hiệu quả, đáp ứng yêu cầu về xử lý hành vi vi phạm',
                'Chưa kịp thời, chưa hiệu quả, còn có khó khăn vướng mắc',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau12_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>

            {/* Câu 13 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 13. Theo ông/bà, nguyên nhân chủ yếu dẫn đến vi phạm pháp luật về an toàn thực phẩm là gì? <span className="text-gray-500 font-normal">(có thể lựa chọn nhiều phương án)</span></h4>
              <CheckboxGroup name="cau13" register={register} options={[
                'Hệ thống pháp luật còn có hạn chế, bất cập',
                'Ý thức chấp hành pháp luật của một số cơ sở sản xuất, kinh doanh còn hạn chế',
                'Nhận thức và thói quen tiêu dùng của một bộ phận người dân còn hạn chế; chưa quan tâm đầy đủ đến nguồn gốc, nhãn hàng hóa, hạn sử dụng, chất lượng sản phẩm và nội dung quảng cáo khi lựa chọn, sử dụng thực phẩm',
                'Công tác tuyên truyền, phổ biến pháp luật chưa thường xuyên, chưa dễ hiểu',
                'Công tác kiểm tra, xử lý vi phạm chưa thường xuyên hoặc chưa đủ sức răn đe',
                'Việc kinh doanh thực phẩm chức năng qua mạng xã hội, thương mại điện tử, hàng “xách tay” khó kiểm soát nguồn gốc, chất lượng và chủ thể vi phạm',
                'Công tác lấy mẫu, kiểm nghiệm, công khai kết quả kiểm nghiệm, cảnh báo và thu hồi sản phẩm không bảo đảm an toàn thực phẩm còn hạn chế',
                'Một số cơ sở nhỏ lẻ, thức ăn đường phố, kinh doanh thời vụ chưa chấp hành nghiêm điều kiện bảo đảm an toàn thực phẩm',
                'Nguyên nhân khác'
              ]} />
              <input {...register('cau13_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Nguyên nhân khác..." />
            </div>

            {/* Câu 14 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 14. Ông/bà đánh giá như thế nào về hoạt động phối hợp giữa các cơ quan, đơn vị trong quản lý nhà nước về an toàn thực phẩm thời gian qua?</h4>
              <RadioGroup name="cau14" register={register} options={[
                'Tốt, rõ đầu mối và trách nhiệm phối hợp',
                'Cơ bản ổn định nhưng còn thiếu cơ chế chia sẻ dữ liệu, thông tin kiểm tra, kiểm nghiệm',
                'Chưa tốt, còn chồng chéo hoặc bỏ sót đối tượng quản lý',
                'Không có ý kiến'
              ]} />
            </div>

            {/* Câu 15 */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-2">Câu 15. Theo ông/bà, cần có giải pháp gì để nâng cao hiệu lực, hiệu quả quản lý nhà nước về thực phẩm chức năng, kiểm nghiệm thực phẩm và quản lý cơ sở không thuộc diện cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm?</h4>
              <CheckboxGroup name="cau15" register={register} options={[
                'Hoàn thiện, sửa đổi, bổ sung quy định pháp luật theo hướng thống nhất, rõ trách nhiệm, dễ áp dụng trong thực tiễn quản lý tại địa phương',
                'Quy định rõ hơn trách nhiệm quản lý, phân công đầu mối, cơ chế phối hợp giữa các ngành, các cấp trong mô hình chính quyền địa phương 02 cấp sau sáp nhập',
                'Tăng cường hậu kiểm đối với thực phẩm chức năng, nhất là sản phẩm tự công bố, quảng cáo trên mạng xã hội, thương mại điện tử, livestream',
                'Siết chặt quản lý quảng cáo thực phẩm chức năng, xử lý nghiêm hành vi quảng cáo sai sự thật, quảng cáo quá công dụng, gây hiểu nhầm sản phẩm có tác dụng như thuốc',
                'Đầu tư cơ sở vật chất, trang thiết bị, phương tiện kiểm tra cơ động, sinh phẩm, test nhanh, hóa chất phục vụ kiểm nghiệm, kiểm tra nhanh an toàn thực phẩm',
                'Bảo đảm kinh phí lấy mẫu, gửi mẫu, kiểm nghiệm, hậu kiểm, điều tra, khảo sát và xử lý vi phạm về an toàn thực phẩm',
                'Nâng cao năng lực phòng kiểm nghiệm, rút ngắn thời gian trả kết quả kiểm nghiệm, đáp ứng yêu cầu xử lý vi phạm, truy xuất nguồn gốc, thu hồi sản phẩm không bảo đảm an toàn',
                'Kiện toàn, bồi dưỡng, tập huấn chuyên môn chuyên sâu cho đội ngũ cán bộ kiêm nhiệm làm công tác an toàn thực phẩm tại Ủy ban nhân dân cấp xã sau khi thực hiện mô hình sáp nhập, tổ chức lại bộ máy hành chính',
                'Tăng cường rà soát, thống kê, phân loại, cập nhật dữ liệu cơ sở không thuộc diện cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm',
                'Đẩy mạnh ký cam kết, kiểm tra sau ký cam kết và hậu kiểm đối với cơ sở nhỏ lẻ, hộ gia đình, kinh doanh thời vụ, thức ăn đường phố, cơ sở trong chợ',
                'Tăng cường tuyên truyền, tập huấn, hướng dẫn pháp luật về an toàn thực phẩm cho cơ sở sản xuất, kinh doanh và người tiêu dùng',
                'Bồi dưỡng, tập huấn chuyên môn, nghiệp vụ cho cán bộ làm công tác quản lý an toàn thực phẩm ở cấp cơ sở, nhất là sau sáp nhập, tổ chức lại bộ máy',
                'Xây dựng cơ sở dữ liệu dùng chung về cơ sở sản xuất, kinh doanh thực phẩm, kết quả kiểm nghiệm, hậu kiểm, xử lý vi phạm và cảnh báo nguy cơ an toàn thực phẩm',
                'Ý kiến khác (đề nghị nêu rõ)'
              ]} />
              <input {...register('cau15_khac')} className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Ý kiến khác..." />
            </div>
          </section>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-bold py-3 rounded-lg transition text-base"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi phiếu khảo sát'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 pt-4 font-medium">
            *** Xin trân trọng cảm ơn sự hợp tác của Ông/Bà! ***
          </p>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6 pb-4">
          © UBND phường Thành Nhất – Tỉnh Đắk Lắk
        </p>
      </div>
    </div>
  )
}
