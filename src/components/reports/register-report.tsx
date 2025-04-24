import { useLazyGanrateRegisterReportsApiQuery } from "@/api/reports";
import { CompanyWiseStockReportRecord, ProductWiseStockReportRecord } from "@/types/reports";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterReport() {

  const navigate = useNavigate();


  const location = useLocation()
  const payload = location.state

  const [ganrateRegisterReportsApi, { isLoading }] = useLazyGanrateRegisterReportsApiQuery({})

  const [registerReportsData, setRegisterReportsData] = useState<(CompanyWiseStockReportRecord | ProductWiseStockReportRecord)[]>([])
  const [grandTotal, setGrandTotal] = useState<number>(0);

  useEffect(() => {
    if (payload) {
      const getRegisterReport = async () => {
        const { data } = await ganrateRegisterReportsApi(payload)
        setRegisterReportsData(data?.result?.data ?? [])
        setGrandTotal(data?.result?.grandTotal)
      }
      getRegisterReport()
    }
  }, [payload])

  console.log(registerReportsData)
  return (
    <div>register-report</div>
  )
}

export default RegisterReport