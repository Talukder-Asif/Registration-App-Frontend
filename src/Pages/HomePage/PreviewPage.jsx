import { useParams } from "react-router-dom";
import RegForm from "../../Component/RegForm";
const PreviewPage = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <div>
      <RegForm id={params.id}></RegForm>
    </div>
  );
};

export default PreviewPage;
