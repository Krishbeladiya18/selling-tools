import { useLazyGanrateRegisterReportsApiQuery } from "@/api/reports";
import { useNavigate } from "react-router-dom";

function RegisterReport() {

  const navigate = useNavigate();
  const [ganrateRegisterReportsApi, { isLoading }] = useLazyGanrateRegisterReportsApiQuery({})

  

  return (
    <div>register-report</div>
  )
}

export default RegisterReport