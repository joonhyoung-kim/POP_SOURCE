using System.Collections.Generic;
using System.Data;
using System.Runtime.Serialization;

namespace SmartMom_Lib
{

    /// <summary>
    /// 서버 결과 객체
    /// </summary>
    [KnownType(typeof(TTable))]
    [DataContract]
    public class TResponse
    {
        /// <summary>
        /// 서버여부
        /// </summary>
        [DataMember]
        public bool TestServer { get; set; } = true;
        /// <summary>
        /// 정상 처리 여부
        /// </summary>
        [DataMember]
        public bool IsSuccess { get; set; } = false;
        /// <summary>
        /// 오류코드
        /// </summary>
        [DataMember]
        public string ErrorCode { get; set; } = string.Empty;
        /// <summary>
        /// 오류코드 파라메터
        /// </summary>
        [DataMember]
        public string ErrorParameter { get; set; }
        /// <summary>
        /// 오류코드 파라메터 Split문자열
        /// </summary>
        [DataMember]
        public string SplitParameter { get; set; }
        /// <summary>
        /// 결과
        /// </summary>
        [DataMember]
        public Dictionary<int, TTable> Response { get; set; }
        /// <summary>
        /// 요청데이터
        /// </summary>
        public TRequest Request { get; internal set; }

        public TTable this[int index]
        {
            get
            {
                // 테이블 개수 확인
                if (index < 0 || Response.Count > index +1)
                {
                    return null;
                }

                // 객체반환
                return Response[index];
            }
        }

        /// <summary>
        /// 결과 반환 객체
        /// </summary>
        /// <param name="request"></param>
        public TResponse(TRequest request)
        {
            Request = request;

            Response = new Dictionary<int, TTable>();
        }

        /// <summary>
        /// 테이블 변환
        /// </summary>
        /// <returns></returns>
        public DataSet Parse(int index)
        {
            TTable res = Response[index];
            if (res == null)
            {
                return null;
            }
            return res.ParseDataSet();
        }
        /// <summary>
        /// 테이블 변환
        /// </summary>
        /// <returns></returns>
        public DataTable Parse(int index, string tableName = "OUT_CUR0")
        {
            TTable res = Response[index];
            if(res == null)
            {
                return null;
            }
            return res.ParseTable(tableName);
        }
    }
}