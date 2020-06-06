using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace TU.Core.Transfer
{

    /// <summary>
    /// 서버 결과 객체
    /// </summary>
    public class TResponse
    {
        /// <summary>
        /// 서버여부
        /// </summary>
        public bool TestServer { get; set; } = true;
        /// <summary>
        /// 정상 처리 여부
        /// </summary>
        public bool IsSuccess { get; set; } = false;
        /// <summary>
        /// 오류코드
        /// </summary>
        public string ErrorCode { get; set; } = string.Empty;
        /// <summary>
        /// 오류코드 파라메터
        /// </summary>
        public string ErrorParameter { get; set; }
        /// <summary>
        /// 오류코드 파라메터 Split문자열
        /// </summary>
        public string SplitParameter { get; set; }
        /// <summary>
        /// 결과
        /// </summary>
        public Dictionary<string, Response> Response { get; set; }
        /// <summary>
        /// 요청데이터
        /// </summary>
        public TRequest Request { get; private set; }

        public Response this[int index]
        {
            get
            {
                // 테이블 개수 확인
                if (index < 0 || Response.Count > index +1)
                {
                    return null;
                }

                // key 검색
                string key = Response.Keys.ToArray()[index];
                // 객체반환
                return Response[key];
            }
        }

        public Response this[string key]
        {
            get
            {
                // 공란의 경우 사용못함.
                if (string.IsNullOrEmpty(key) || Response.ContainsKey(key))
                {
                    return null;
                }
                return Response[key];
            }
        }

        /// <summary>
        /// 결과 반환 객체
        /// </summary>
        /// <param name="request"></param>
        public TResponse(TRequest request)
        {
            Request = request;

            Response = new Dictionary<string, Response>();
        }

        /// <summary>
        /// 테이블 변환
        /// </summary>
        /// <returns></returns>
        public DataTable ParseTable(int index)
        {
            if(index < 0 ||  Response.Keys.Count> index+1)
            {
                return null;
            }

            return ParseTable(Response.Keys.ToArray()[index]);
        }
        /// <summary>
        /// 테이블 변환
        /// </summary>
        /// <returns></returns>
        public DataTable ParseTable(string key)
        {
            if(!Response.ContainsKey(key))
            {
                return null;
            }
            DataTable dt = new DataTable(key);
            if (Response[key].Count < 1)
            {
                return dt;
            }
            TCollection tmp = Response[key].First();

            // 테이블 스키마 생성
            foreach (TItem col in tmp)
            {
                dt.Columns.Add(col.MakeColumn());
            }

            // 데이터 변환
            foreach (TCollection row in Response[key])
            {
                DataRow dr = dt.NewRow();

                row.ToList().ForEach( (col) => 
               {
                   dr[col.Key] = col.Value;
               });

                dt.Rows.Add(dr);
            }

            // 테이블 행 상태 변경
            dt.AcceptChanges();
            return dt;
        }
    }
}