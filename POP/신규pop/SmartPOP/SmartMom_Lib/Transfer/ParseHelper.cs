using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.IO;
using System.Text;
using TU.Core.Transfer;

namespace TU.Core.Helpers
{
    public class ParseHelper
    {

        /// <summary>
        /// 수신받은 데이터를 반환객체(T)로 변환한다
        /// </summary>
        /// <param name="response"></param>
        /// <param name="index">0이상 지정된 response index check/ -1: DataSetPase 사용</param>
        /// <returns></returns>
        public static ObservableCollection<Dictionary<string, object>> DataParse(TResponse response, int index =0)
        {
            // 수신메시지 체크
            DataResultCheck(response);

            Response res = response[index];
            if (res == null)
            {
                return null;
            }
            return res.Parse();
        }

        /// <summary>
        /// 수신받은 데이터를 반환객체(DataTable)로 변환한다
        ///  -> 컬럼명은 모두 대문자로 자동 변환됩니다.
        /// </summary>
        /// <param name="response"></param>
        /// <param name="index">0이상 지정된 response index check/ -1: DataSetPase 사용</param>
        /// <returns></returns>
        public static DataTable DataTableParse(TResponse response, int index = 0)
        {
            // 수신 메시지 체크
            DataResultCheck(response);

            // 결과 반영
            return response.ParseTable(index);
        }
        /// <summary>
        /// 수신받은 데이터를 반환객체(DataTable)로 변환한다
        ///  -> 컬럼명은 모두 대문자로 자동 변환됩니다.
        /// </summary>
        /// <param name="response"></param>
        /// <param name="index">0이상 지정된 response index check/ -1: DataSetPase 사용</param>
        /// <returns></returns>
        public static DataTable DataTableParse(TResponse response, string key)
        {
            // 수신 메시지 체크
            DataResultCheck(response);

            // 결과 반영
            return response.ParseTable(key);
        }

        /// <summary>
        /// 수신받은 데이터를 반환객체(DataSet)로 변환한다
        ///  -> 컬럼명은 모두 대문자로 자동 변환됩니다.
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static DataSet DataSetParse(TResponse response)
        {
            // 수신 메시지 체크
            DataResultCheck(response);

            DataSet ds = new DataSet();

            foreach(string tableName in response.Response.Keys)
            {
                ds.Tables.Add(response.ParseTable(tableName) );
            }

            // 결과 반영
            return ds;
        }
        /// <summary>
        /// 데이터 처리 요청 후 성공여부 체크
        /// </summary>
        /// <param name="response"></param>
        /// <param name="index">체크 대상 목록</param>
        /// <returns></returns>
        public static void DataResultCheck(TResponse response)
        {
            // NETWORK 연결 오류 시 수신받은 데이터가 없음.
            if (response == null)
            {
                // 수신데이터가 존재 하지 않습니다.
                throw new Exception("PARSEHELPER_FAIL_RESPONSEDATA");
            }
            if (!response.IsSuccess)
            {
                throw new Exception(response.ErrorCode);
            }
        }
        /// <summary>
        /// 값이 Null 인지 체크
        /// </summary>
        /// <param name="data"></param>
        /// <param name="exceptionParaKey"></param>
        /// <returns></returns>
        public static bool IsNull(DataRow row, string key, string exceptionParaKey = "", params string[] exceptionPara)
        {
            if (!string.IsNullOrEmpty(exceptionParaKey))
            {
                if (row == null)
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    throw new Exception($"{ exceptionParaKey} 값이 존재하지 않습니다.");
                }
            }

            if (!row.Table.Columns.Contains(key))
            {
                if (!string.IsNullOrEmpty(exceptionParaKey))
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    //throw new ExceptionItem(exceptionParaKey, exceptionPara);
                }
                return false;
            }

            return row[key] == null;
        }
        /// <summary>
        /// 값이 Null 인지 체크
        /// </summary>
        /// <param name="data"></param>
        /// <param name="exceptionParaKey"></param>
        /// <returns></returns>
        public static bool IsNull(string data, string exceptionParaKey = "", params string[] exceptionPara)
        {
            if( !string.IsNullOrEmpty(exceptionParaKey))
            {
                if(string.IsNullOrEmpty(data))
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    throw new Exception($"{ exceptionParaKey} 값이 존재하지 않습니다.");
                }
            }
            return string.IsNullOrEmpty(data);
        }
        /// <summary>
        /// 값이 Null 인지 체크
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static bool IsNull(object data, string exceptionParaKey = "", params string[] exceptionPara)
        {
            if(!string.IsNullOrEmpty(exceptionParaKey))
            {
                if (data == null)
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    throw new Exception($"{ exceptionParaKey} 값이 존재하지 않습니다.");
                }
            }
            return data == null || string.IsNullOrEmpty(data.ToString());
        }
        /// <summary>
        /// 값이 Null 인지 체크
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static bool IsNull(IDictionary dic, string key, string exceptionParaKey = "", params string[] exceptionPara)
        {
            if(IsNull(dic[key]) || !dic.Contains(key))
            {
                if (!string.IsNullOrEmpty(exceptionParaKey))
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    throw new Exception($"{ key} 값이 존재하지 않습니다.");
                }
                return true;
            }
            object data = dic[key];
            return data == null;
        }
        /// <summary>
        /// "Y" or "TRUE" 일 경우 true으로 반환
        /// </summary>
        /// <param name="data"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool IsYN(string data)
        {
            if(IsNull(data))
            {
                return false;
            }
            return "Y".Equals(data.ToUpper()) || "TRUE".Equals(data.ToUpper());
        }
        /// <summary>
        /// true => "Y"   false => "N"  값으로 반환
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string IsYN(bool data)
        {
            return data ? "Y" : "N";
        }

        /// <summary>
        /// Dictionary 객체에 목록 존재여부 확인
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public static bool IsEmpty(IDictionary dic, string key, string exceptionParaKey = "")
        {
            if (!string.IsNullOrEmpty(exceptionParaKey))
            {
                if (dic == null || dic.Count < 1 || !dic.Contains(key))
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    //throw new ExceptionItem("", exceptionParaKey);
                }
            }
            return dic == null || dic.Count < 1 || !dic.Contains(key);
        }
        /// <summary>
        /// List 객체에 목록 존재여부 확인
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public static bool IsEmpty(IList list, string exceptionParaKey = "")
        {
            if (!string.IsNullOrEmpty(exceptionParaKey))
            {
                if (list == null || list.Count < 1)
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    throw new Exception($"{ exceptionParaKey} 값이 존재하지 않습니다.");
                }
            }
            return list == null || list.Count < 1;
        }
        /// <summary>
        /// List 객체에 목록 존재여부 확인
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>
        public static bool IsEmpty(ICollection collection, string exceptionParaKey = "")
        {
            if (!string.IsNullOrEmpty(exceptionParaKey))
            {
                if (collection == null || collection.Count < 1)
                {
                    // 값이 존재하지 않습니다.  KEY: {0}
                    throw new Exception($"{ exceptionParaKey} 값이 존재하지 않습니다.");
                }
            }
            return collection == null || collection.Count < 1;
        }
        /// <summary>
        /// 문자열 길이만큼 채워서 반환하기
        /// </summary>
        /// <param name="data">대상문자열</param>
        /// <param name="len">반환길이</param>
        /// <param name="blankChar">대체문자</param>
        /// <returns></returns>
        public static string Substring(string data, int len, char blankChar=' ')
        {
            // 문자열 길이가 길경우 문자열 길이만큼 반환
            if(data.Length > len)
            {
                return data.Substring(0, len);
            }
            // 문자열 길이가 짧을 경우 끝에 문자열 길이만큼 추가 
            StringBuilder sb = new StringBuilder();
            sb.Append(data);
            for (int idx=0; idx< len; idx++)
            {
                sb.Append(blankChar);
            }
            return sb.ToString().Substring(0, len);
        }
        /// <summary>
        /// 문자열 길이만큼 채워서 반환하기
        /// </summary>
        /// <param name="data">대상문자열</param>
        /// <param name="len">반환길이</param>
        /// <param name="blankChar">대체문자</param>
        /// <returns></returns>
        public static string Substring(Dictionary<string, object> dic, string key, int len, char blankChar = ' ')
        {
            if( !dic.ContainsKey(key) )
            {
                return Substring("", len, blankChar);
            }

            // 문자열 길이가 길경우 문자열 길이만큼 반환
            return Substring(dic[key].ToString(), len, blankChar);
        }
        /// <summary>
        /// 숫자 앞에 삽입하여 반환하기
        ///  - 끝에 채울경우 문자형으로 변환하여 요청
        /// </summary>
        /// <param name="data">대상문자열</param>
        /// <param name="len">반환길이</param>
        /// <param name="blankChar">대체문자</param>
        /// <returns></returns>
        public static string Substring(int data, int len, char blankChar = ' ')
        {
            // 문자열 길이가 짧을 경우 끝에 문자열 길이만큼 추가 
            StringBuilder sb = new StringBuilder();
            for (int idx = 0; idx < len; idx++)
            {
                sb.Append(blankChar);
            }
            sb.Append(data);

            // 잘라낼 시작지점 계산
            return sb.ToString().Substring(sb.Length - len);
        }
        /// <summary>
        /// 실수 앞에 삽입하여 반환하기
        ///  - 끝에 채울경우 문자형으로 변환하여 요청
        /// </summary>
        /// <param name="data">대상문자열</param>
        /// <param name="floatLen">소수점 자리수</param>
        /// <param name="len">반환길이</param>
        /// <param name="blankChar">대체문자</param>
        /// <returns></returns>
        public static string Substring(double data, string format, int len, char blankChar = ' ')
        {
            // 문자열 길이가 짧을 경우 끝에 문자열 길이만큼 추가 
            StringBuilder sb = new StringBuilder();
            for (int idx = 0; idx < len; idx++)
            {
                sb.Append(blankChar);
            }
            sb.Append(data.ToString(format));

            // 잘라낼 시작지점 계산
            return sb.ToString().Substring(sb.Length - len);
        }
        /// <summary>
        /// LocalPC 의 현재시간을 가져온다.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string LocalDateTimeToString(string formatString="yyyyMMddHHmmss")
        {
            return DateTime.Now.ToString(formatString);
        }
        /// <summary>
        /// LocalPC 의 현재날자를 가져온다.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string LocalDateToString(string formatString = "yyyyMMdd")
        {
            return DateTime.Now.ToString(formatString);
        }
        /// <summary>
        /// 날자포맷으로 가져온다.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string DateToString(DateTime date, string formatString="yyyyMMdd")
        {
            return date.ToString(formatString);
        }
        /// <summary>
        /// 날자시간 포맷으로 가져온다
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string DateTimeToString(DateTime date, string formatString= "yyyyMMddHHmmss")
        {
            return date.ToString(formatString);
        }
        /// <summary>
        /// 날자시간 포맷으로 가져온다
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DateTime StringToDate(string date, string formatString="yyyy-MM-dd")
        {
            DateTime f = DateTime.MinValue;

            if (DateTime.TryParse(date, out f))
            {
                return DateTime.Parse(f.ToString(formatString));
            }
            else
            {
                return f;
            }
        }
        /// <summary>
        /// 날자시간 포맷으로 가져온다
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DateTime StringToDateTime(string date, string formatString="yyyy-MM-dd HH:mm:ss")
        {
            DateTime f = DateTime.MinValue;

            if (DateTime.TryParse(date, out f))
            {
                return f;
            }
            else
            {
                return f;
            }
        }

        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 변환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string Parse(DataRow row, string key, string defaultValue = "")
        {
            if (string.IsNullOrEmpty(key) || IsNull(row, key))
            {
                return defaultValue;
            }
            return row[key].ToString();
        }
        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 변환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string Parse(IDictionary dic, string key, string defaultValue = "")
        {
            if (string.IsNullOrEmpty(key) || IsNull(dic, key))
            {
                return defaultValue;
            }
            return dic[key].ToString();
        }
        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 변환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string Parse(string data, string defaultValue = "")
        {
            if (string.IsNullOrEmpty(data))
            {
                return defaultValue;
            }
            else
            {
                return data;
            }
        }
        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 치환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static int Parse(string data, int defaultValue = 0)
        {
            int tmp = defaultValue;
            if(int.TryParse(data, out tmp))
            {
                return tmp;
            }
            else
            {
                return defaultValue;
            }
        }
        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 치환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static double Parse(string data, double defaultValue = 0d)
        {
            double tmp = defaultValue;
            if (double.TryParse(data, out tmp))
            {
                return tmp;
            }
            else
            {
                return defaultValue;
            }
        }
        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 치환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static float Parse(string data, float defaultValue = 0f)
        {
            float tmp = defaultValue;
            if (float.TryParse(data, out tmp))
            {
                return tmp;
            }
            else
            {
                return defaultValue;
            }

        }
        /// <summary>
        /// 값이 비워져 있는경우 defaultValue 값으로 치환한다.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static bool Parse(string data, bool defaultValue = false)
        {
            bool tmp = defaultValue;
            if ("Y".Equals(data.ToUpper() )) return true;

            if (bool.TryParse(data, out tmp))
            {
                return tmp;
            }
            else
            {
                return defaultValue;
            }
        }
        /// <summary>
        /// 키값 String 값으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string Parse(Dictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key)) return string.Empty;
            if (dic[key] == null) return string.Empty;
            return dic[key].ToString().Replace("\r", "");
        }
        /// <summary>
        /// 키값 Bool형으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool ParseBool(Dictionary<string, object> dic, string key)
        {
            bool f = false;
            if (!dic.ContainsKey(key)) return f;
            string data = Parse(dic, key);

            return "Y".Equals(data) || "TRUE".Equals(data.ToUpper());
        }
        /// <summary>
        /// 키값 float형으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static float ParseFloat(Dictionary<string, object> dic, string key)
        {
            float f = 0f;
            if (!dic.ContainsKey(key)) return f;
            string data = Parse(dic, key);

            float.TryParse(data, out f);

            return f;
        }
        /// <summary>
        /// 키값 integer형으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static int ParseInt(Dictionary<string, object> dic, string key)
        {
            int f = 0;
            if (!dic.ContainsKey(key)) return f;
            string data = Parse(dic, key);

            int.TryParse(data, out f);

            return f;
        }
        /// <summary>
        /// 키값 long형으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static long ParseLong(Dictionary<string, object> dic, string key)
        {
            long f = 0L;
            if (!dic.ContainsKey(key)) return f;
            string data = Parse(dic, key);

            long.TryParse(data, out f);

            return f;
        }
        /// <summary>
        /// 키값 double형으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static double ParseDouble(Dictionary<string, object> dic, string key)
        {
            double f = 0d;
            if (!dic.ContainsKey(key)) return f;
            string data = Parse(dic, key);

            double.TryParse(data, out f);

            return f;
        }
        /// <summary>
        /// 키값 double형으로 반환
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static DateTime ParseDate(Dictionary<string, object> dic, string key)
        {
            DateTime f = DateTime.MinValue;
            if (!dic.ContainsKey(key)) return f;
            string data = Parse(dic, key);

            DateTime.TryParse(data, out f);

            return f;
        }
        /// <summary>
        /// JSON Data Object 변환
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static object ParseJSON(string data)
        {
            try
            {
                JsonSerializer serializer = new JsonSerializer();
                object result = null;
                using (JsonTextReader reader = new JsonTextReader(new StringReader(data)))
                {
                    result = serializer.Deserialize(reader);
                }
                return result;
            }
            catch
            {
                return null;
            }
        }
    }
}
