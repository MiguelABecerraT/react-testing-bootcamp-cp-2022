import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useGetData = () => {
  const [date, setDate] = useState(new Date());
  const [pictureData, setPictureData] = useState();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  const fetchData = useCallback(async () => {
    const dateString = () => {
        if(date){
          const currentDayOfMonth = date.getDate();
          const currentMonth = date.getMonth();
          const currentYear = date.getFullYear();
          return currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth;
        }
        return '';
    }

    if (!axios || !date) return;
    setLoading(true);

    const url = `${process.env.REACT_APP_SERVICE_BASE_URL}?api_key=${process.env.REACT_APP_API_KEY}&date=${dateString()}`;

    try {
      const { data } = await axios.get(url);
      setPictureData(data);
      setErrors(false);
    } catch (e) {
      if (e.response.data.msg) setErrors(e.response.data.msg);
      else setErrors(true);
      setPictureData([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    date,
    pictureData,
    setDate,
    loading,
    errors,
  };
};
