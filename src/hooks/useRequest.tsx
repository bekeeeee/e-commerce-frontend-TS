import axios from "axios";
import { useState, ReactElement } from "react";

export default ({ url, method, body, onSuccess }: any) => {
  const [errors, setErrors] = useState<ReactElement | null>(<div></div>);
  const [loading, setLoading] = useState<Boolean>(false);

  const doRequest = async () => {
    try {
      setLoading(true);
      setErrors(null);

      const response = await axios({
        method,
        url,
        params: body,
      });

      if (onSuccess) {
        setLoading(false);
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      console.log(err);

      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {/* {err.response.data.map((err) => ( */}
            <li key={err.message}>{err.message}</li>
            {/* ))} */}
          </ul>
        </div>
      );
      setLoading(false);
    }
  };

  return { doRequest, errors, loading };
};
